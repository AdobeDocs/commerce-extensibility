---
title: Testing webhooks
description: Learn how to test webhooks before enabling them in production.
keywords:
  - Extensibility
---

# Testing Webhooks

Use the [`webhooks:dev:run <webhook-name> <webhook-arguments-payload>`](commands.md#emulate-webhook-execution) command in development mode to test your webhooks locally. It emulates the execution of your registered webhook, which contains a custom payload, without requiring changes to the Commerce application. Run this command after setting the initial webhook payload in a `webhooks.xml` file. Then run the command again any time you make subsequent modifications to the payload until you can confirm that the payload works as expected.

In this example, the `webhooks.xml` file registered the following webhook:

```xml
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch name="Update_Cart">
                <hook name="validate_stock" url="{env:APP_BUILDER_PROJECT_URL}/product-validate-stock" timeout="2000" softTimeout="200" fallbackErrorMessage="The product stock validation failed">
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```

Instead of manually adding a product to the cart from the storefront, you can run the following command, which specifies a custom payload:

```bash
bin/magento webhooks:dev:run observer.checkout_cart_product_add_before:before '{"data":{"product":{"sku":"simple-product","name":"Simple Product"}}}'
```

The emulated webhook endpoint receives the following payload, according to the `fields` configured for the webhook:

```json
{"product":{"name":"Simple Product","sku":"simple-product"}}
```

If an error occurs, or if an exception is thrown, a message similar to the following is displayed:

```terminal
Failed to process webhook "observer.checkout_cart_product_add_before". Or webhook endpoint returned exception operation. Error: Webhook Response: The product is out of stock
Check logs for more information.
```

Responses for a webhook endpoint may be cached if the `ttl` attribute for a hook is set. To clean the webhook response cache while testing your webhooks locally, run the following command:

```bash
bin/magento cache:clean webhooks_response
```

## Testing webhook endpoint with self-signed SSL certificate

<InlineAlert variant="info" slots="text1" />

SSL verification should be not be disabled in production environments. These options are recommended for development purposes only.

If your webhook endpoint uses a self-signed SSL certificate, you can disable SSL verification for the webhook endpoint by setting the `sslVerification` attribute to `false` in the `hook` element.

```xml
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" 
                      url="{env:APP_BUILDER_PROJECT_URL}/product-validate-stock" 
                      sslVerification="false"
                >
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```

Or, to specify the path to the SSL certificate:

```xml
    <method name="observer.checkout_cart_product_add_before" type="before">
        <hooks>
            <batch>
                <hook name="validate_stock" 
                      url="{env:APP_BUILDER_PROJECT_URL}/product-validate-stock"
                      sslCertificatePath="/path/to/ssl/certificate.pem"
                >
                    <fields>
                        <field name='product.name' source='data.product.name' />
                        <field name='product.sku' source='data.product.sku' />
                    </fields>
                </hook>
            </batch>
        </hooks>
    </method>
```
