```xml
<method name="observer.catalog_product_save_before" type="before">
   <hooks>
       <batch name="product_generate_content">
           <hook name="product_generate_content" url="{env:APP_BUILDER_URL}/product-description" timeout="5000" softTimeout="1000" priority="300" required="true" fallbackErrorMessage="The product could not be updated">
               <headers>
                   <header name="x-gw-ims-org-id">{env:APP_BUILDER_IMS_ORG_ID}</header>
                   <header name="Authorization">Bearer {env:APP_BUILDER_AUTH_TOKEN}</header>
               </headers>
               <fields>
                   <field name="product.name" source="data.product.name" />
                   <field name="product.sku" source="data.product.sku" />
               </fields>
               <rules>
                   <rule field="product.short_description" operator="isEmpty" />
                   <rule field="product.description" operator="isEmpty" />
               </rules>
           </hook>
       </batch>
   </hooks>
</method>
```
