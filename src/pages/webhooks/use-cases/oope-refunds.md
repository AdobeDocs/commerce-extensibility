---
title: Out of process refunds
description: Learn how to connect Commerce-initiated OOPE refunds to an external payment provider using webhooks.
keywords:
  - Extensibility
---

# Out of process refunds

Use this webhook to connect Commerce-initiated refunds for out-of-process extensibility (OOPE) payment methods to an external payment provider.

Commerce invokes the webhook during native online and offline refund processing, before the refund adapter continues. Your integration supplies the external handler.

On Adobe Commerce on Cloud and on-premises (PaaS)instances, install `magento/module-out-of-process-payment-methods` version 0.6.0 or later and generate the webhook interception code as described in the [webhooks configuration reference](../xml-schema.md).

Define an _after_ subscription to return refund result data. This means after the OOPE refund-request service executes, **not after the credit memo is saved**. Commerce still waits for the webhook response before continuing refund processing. A _before_ subscription can reject the operation but cannot replace the service result.

For the overall workflow and Admin payment configuration, see [Commerce-initiated OOPE refunds](../../starter-kit/checkout/payment-use-cases.md#commerce-initiated-oope-refunds).

## Webhook name

[PaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) `plugin.magento.out_of_process_payment_methods.api.refund_request.execute`

[SaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) `plugin.out_of_process_payment_methods.api.refund_request.execute`

## Payload

The following example shows the default payload structure:

```json
{
  "payload": {
    "schema_version": 1,
    "is_online": true,
    "store_id": 1,
    "order_id": 123,
    "order_increment_id": "000000123",
    "invoice_id": 456,
    "invoice_transaction_id": "capture-789",
    "payment_id": 321,
    "payment_method": "oope_example",
    "payment_last_transaction_id": "capture-789",
    "grand_total": 55,
    "base_grand_total": 55,
    "order_currency_code": "USD",
    "base_currency_code": "USD",
    "shipping_amount": 5,
    "base_shipping_amount": 5,
    "adjustment_positive": 0,
    "base_adjustment_positive": 0,
    "adjustment_negative": 0,
    "base_adjustment_negative": 0,
    "items": [
      {"order_item_id": 987, "qty": 1}
    ]
  }
}
```

Amounts are expressed in currency units, not integer minor units.

The item list excludes non-positive quantities and rows already marked for deletion. Positive parent and child rows remain separate. Use the supplied totals rather than summing item quantities to determine the refund amount. Shipping-only or adjustment-only refunds can have an empty `items` array.

The payload does not contain a persisted credit memo ID or a retry-stable refund identifier.

## Configuration

Configure the webhook as required so that a delivery failure or timeout prevents Commerce from continuing without the handler's response.

The following example selects the complete payload argument:

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

#### webhook.xml (PaaS)

```xml
<method name="plugin.magento.out_of_process_payment_methods.api.refund_request.execute"
        type="after">
    <hooks>
        <batch name="oope_refunds">
            <hook name="refund_request"
                  url="{env:OOPE_REFUND_URL}"
                  method="POST"
                  timeout="5000"
                  softTimeout="1000"
                  required="true"
                  active="true"
                  fallbackErrorMessage="The refund could not be processed.">
                <fields>
                    <field name="payload"/>
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```

### Admin (SaaS)

```yaml
Webhook method: plugin.out_of_process_payment_methods.api.refund_request.execute
Webhook type: after
Batch name: oope_refunds
Hook name: refund_request
URL: <Your refund handler URL>
Timeout: 5000
Soft timeout: 1000
Required: Required
Active: Yes
Method: POST

Hook Fields:
  Name: payload
  Source: payload
  Active: Yes
```

The timeout values are examples. Choose bounded limits appropriate for the integration, and configure endpoint authentication as described in [Create a webhook](../create-webhooks.md).

## Handler behavior

The handler is expected to distinguish the following cases:

| Request | Expected handler behavior |
|---|---|
| Offline: `is_online` is `false` | Do not request a gateway refund. Return success so Commerce can continue normally. |
| Online, blocking integration | Validate the invoice and capture context, request the gateway refund, and wait for its result before responding. |
| Online, asynchronous integration | Validate the invoice and capture context, durably accept responsibility for processing the refund, and respond without waiting for gateway completion. |

`is_online` represents requested intent. Commerce can process an online request without an associated invoice as offline. Do not treat this flag alone, or the latest payment transaction reference, as sufficient capture context for a gateway refund.

## Response examples

Return HTTP `200` with a supported [webhook response operation](../responses.md). The response is an operation envelope, not the result object itself.

### Continue without a comment

```json
{"op": "success"}
```

Use this for an offline no-op, or when online processing has completed or been accepted without an accompanying comment.

### Continue with an internal credit memo comment

```json
{
  "op": "replace",
  "path": "result",
  "value": {
    "comment": "Refund accepted for processing. Gateway reference: RF-123."
  }
}
```

The service result is an extensible object. Commerce currently recognizes only `comment`. Unknown result fields are ignored.

The optional `comment` accepts a string or `null`. A missing, `null`, empty or whitespace-only comment adds nothing. Non-string values are ignored with a warning that does not log the supplied content; they do not reject the refund.

Commerce HTML-escapes strings before storing them through native comment handling. HTML markup is displayed literally, not rendered as HTML. Ordinary text containing angle brackets, currency symbols or email addresses remains readable. If the credit memo implementation does not support native comment handling, Commerce skips the comment with a warning rather than rejecting the refund. Refund execution exceptions still reject processing as before.

Commerce saves the comment with the successfully saved credit memo. It is not visible on the storefront and does not trigger customer notification. The comment records information from the handler. It does not change the refund's financial status.

### Reject the refund

```json
{
  "op": "exception",
  "message": "The payment provider declined the refund."
}
```

Commerce stops refund processing. The exception message is not saved as a credit memo or invoice comment.

## Processing boundaries

This webhook runs for OOPE payments through native refund workflows, including Admin refunds and the invoice, order and credit memo refund APIs. Saving a credit memo entity through `POST /V1/creditmemo` alone does not invoke refund processing.

Webhook delivery is synchronous, even when the handler starts asynchronous gateway work. Acceptance does not defer Commerce refund accounting or introduce a pending-refund lifecycle.

A successful gateway refund or asynchronous acceptance is not atomic with Commerce persistence: a later Commerce failure can still prevent the credit memo from being saved. The contract does not provide retry-safe idempotency or automatic correlation with a later asynchronous result. Integrations must handle ambiguous outcomes and reconciliation; do not assume resubmitting a refund is safe.
