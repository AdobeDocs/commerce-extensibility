---
title: Integrate with EDS Storefront
description: Learn about how to integrate your EDS Storefront with Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Integrate with EDS storefront

Integrate your Out-of-Process Extensions (OOPE) with the Edge Delivery Service (EDS) Storefront.

## Prerequisites

The following prerequisites are required to integrate your OOPE integration with the EDS Storefront:

- [Integrate EDS Storefront with Adobe Commerce](https://experienceleague.adobe.com/developer/commerce/storefront/).
- Configure Storefront in EDS with the [checkout drop-in component](https://experienceleague.adobe.com/developer/commerce/storefront/drop-ins/checkout/).
  - The checkout drop-in component allows users to enter shipping and payment information, review their order details, and confirm their purchase.
  - To access the latest EDS Storefront boilerplate with drop-in components, see [EDS Adobe Commerce Boilerplate](https://github.com/hlxsites/aem-boilerplate-commerce).

## Integrate with checkout drop-in components

Checkout drop-in components provide extensibility points to integrate with OOPE payment methods. 
See [Add a payment method](https://experienceleague.adobe.com/developer/commerce/storefront/dropins/checkout/tutorials/add-payment-method/) from Checkout drop-in documentation for integration details.

## Extend OOPE GraphQL Schema

If you want to retrieve OOPE payment method information from the Commerce instance, you can extend the GraphQL query using drop-in components with the [GraphQL Extensibility API](https://experienceleague.adobe.com/developer/commerce/storefront/dropins/all/extending/).

1. In `build.mjs` of the boilerplate, add the following code to extend the OOPE GraphQL schema:

  ```javascript
  overrideGQLOperations([
    {
      npm: '@dropins/storefront-checkout',
      operations: [
        `
    fragment CHECKOUT_DATA_FRAGMENT on Cart {
      available_payment_methods {
        code
        title
        oope_payment_method_config {
          backend_integration_url
          custom_config {
            ... on CustomConfigKeyValue {
                key
                value
            }
          }
        }
      }
      selected_payment_method {
        code
        title
        oope_payment_method_config {
          backend_integration_url
          custom_config {
            ... on CustomConfigKeyValue {
                key
                value
            }
          }
        }
      }
    }
  `,
      ],
    },
  ]);
  ```

1. Extend the OOPE GraphQL schema in the checkout drop-in component initializer. It enables the drop-in component to retrieve the OOPE data.

  ```javascript
  await initializeDropin(async () => {
    ...
    return initializers.mountImmediately(initialize, {
        langDefinitions,
        models: {
          CartModel: {
              transformer: (data) => {
                return {
                    availablePaymentMethods: data?.available_payment_methods,
                    selectedPaymentMethod: data?.selected_payment_method,
                };
              },
          },
        },
    });
  })();
  ```

1. Retrieve the OOPE payment method information from the data coming from the event responses.

  ```javascript
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  ```

1. Retrieve Cart information from the data coming from the event responses.

  ```javascript
  events.on('cart/data', handleCartData, { eager: true });
  ```
