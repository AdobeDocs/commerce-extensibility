```xml
<method name="observer.checkout_cart_product_add_before" type="before">
    <hooks>
        <batch name="validate_stock">
            <hook name="validate_stock" url="{env:APP_BUILDER_URL}/product-validate-stock" timeout="5000"
softTimeout="100" priority="100" required="true" fallbackErrorMessage="The product stock validation failed">
                <headers>
                    <header resolver="Magento\WebhookModule\Model\AddProductToCartResolver" />
                </headers>
                <fields>
                    <field name='product.name' source='data.product.name' />
                    <field name='product.category_ids' source='data.product.category_ids' />
                    <field name='product.sku' source='data.product.sku' />
                </fields>
            </hook>
        </batch>
    </hooks>
</method>
```
