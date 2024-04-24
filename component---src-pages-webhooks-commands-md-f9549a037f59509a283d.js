"use strict";(self.webpackChunkcommerce_extensibility=self.webpackChunkcommerce_extensibility||[]).push([[2413],{38241:function(e,n,a){a.r(n),a.d(n,{_frontmatter:function(){return m},default:function(){return c}});var t=a(87462),o=a(45987),r=(a(35776),a(3905)),i=a(91515);const d=["components"],m={},s=(l="InlineAlert",function(e){return console.warn("Component "+l+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var l;const p={_frontmatter:m},u=i.Z;function c(e){let{components:n}=e,a=(0,o.Z)(e,d);return(0,r.mdx)(u,(0,t.Z)({},p,a,{components:n,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"webhooks-commands"},"Webhooks commands"),(0,r.mdx)("p",null,"Adobe Commerce provides the following commands to configure and process webhooks:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#display-the-payload-of-a-webhook"},"webhooks:info")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#return-a-list-of-supported-webhook-event-names"},"webhooks:list:all")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#return-a-list-of-subscribed-webhooks"},"webhooks:list")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#generate-plugins"},"webhooks:generate:module")),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("a",{parentName:"li",href:"#emulate-webhook-execution"},"webhooks:dev:run"))),(0,r.mdx)("h2",{id:"display-the-payload-of-a-webhook"},"Display the payload of a webhook"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:info")," command returns the payload of the specified webhook. You can optionally specify the depth of the payload to reduce the amount data returned."),(0,r.mdx)(s,{variant:"info",slots:"text",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"The actual payload of a transmitted webhook can be different from that returned by the ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:info"),". The command response is based on the current state of objects and variables."),(0,r.mdx)("p",null,"The value of the ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhook-name")," argument must be a valid Commerce event name. The value must use the following pattern:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-text"},"<type>.<event_name>\n")),(0,r.mdx)("p",null,"where:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"type")," specifies the origin of the event. Specify ",(0,r.mdx)("inlineCode",{parentName:"li"},"observer")," if the event is emitted by a Commerce observer, or specify plugin if the event is based on resource model methods or API interfaces."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"event_name")," identifies the event. For example: ",(0,r.mdx)("inlineCode",{parentName:"li"},"catalog_product_save_after"),".")),(0,r.mdx)("h3",{id:"usage"},"Usage"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},'bin/magento webhooks:info <webhook-name> [--webhook-type="<value>"] [--depth=<integer>]')),(0,r.mdx)("h3",{id:"arguments"},"Arguments"),(0,r.mdx)("p",null,"<","webhook-name> Required. The name must begin with either ",(0,r.mdx)("inlineCode",{parentName:"p"},"observer.")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"plugin.")),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"--webhook-type")," Optional. Indicates whether the plugin that generates the event is a ",(0,r.mdx)("inlineCode",{parentName:"p"},"before")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"after")," plugin. The default value is ",(0,r.mdx)("inlineCode",{parentName:"p"},"before"),". ",(0,r.mdx)("inlineCode",{parentName:"p"},"around")," plugins are not supported."),(0,r.mdx)("h3",{id:"options"},"Options"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"--depth=<integer>")," Determines how many nested levels of the payload to return. The default value is ",(0,r.mdx)("inlineCode",{parentName:"p"},"3"),"."),(0,r.mdx)("h3",{id:"example"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento webhooks:info observer.catalog_product_save_before\n")),(0,r.mdx)("h3",{id:"response"},"Response"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-terminal"},'{\n    "eventName": "string",\n    "data": {\n        "data_object": {\n            "store_id": "int",\n            "name": "string",\n            "price": "float",\n            "visibility": "int",\n            "attribute_set_id": "int",\n            "created_at": "string",\n            "updated_at": "string",\n            "type_id": "array",\n            "status": "int",\n            "category_id": "int",\n            "category": {\n                "products_position": "array",\n                "store_ids": "array",\n                "store_id": "int",\n                "url": "string",\n                "parent_category": "\\Magento\\Catalog\\Model\\Category",\n                "parent_id": "int",\n                "custom_design_date": "array",\n                "path_ids": "array",\n                "level": "int",\n                "request_path": "string",\n                "name": "string",\n                "product_count": "int",\n                "available_sort_by": "array",\n                "default_sort_by": "string",\n                "path": "string",\n                "position": "int",\n                "children_count": "int",\n                "created_at": "string",\n                "updated_at": "string",\n                "is_active": "bool",\n                "category_id": "int",\n                "display_mode": "string",\n                "include_in_menu": "bool",\n                "url_key": "string",\n                "children_data": "\\Magento\\Catalog\\Api\\Data\\CategoryTreeInterface[]"\n            },\n            "category_ids": "array",\n            "website_ids": "array",\n            "store_ids": "array",\n            "qty": "float",\n            "data_changed": "bool",\n            "calculated_final_price": "float",\n            "minimal_price": "float",\n            "special_price": "float",\n            "special_from_date": "mixed",\n            "special_to_date": "mixed",\n            "related_products": "array",\n            "related_product_ids": "array",\n            "up_sell_products": "array",\n            "up_sell_product_ids": "array",\n            "cross_sell_products": "array",\n            "cross_sell_product_ids": "array",\n            "media_attributes": "array",\n            "media_attribute_values": "array",\n            "media_gallery_images": {\n                "loaded": "bool",\n                "last_page_number": "int",\n                "page_size": "int",\n                "size": "int",\n                "first_item": "\\Magento\\Framework\\DataObject",\n                "last_item": "\\Magento\\Framework\\DataObject",\n                "items": "\\Magento\\Framework\\DataObject[]",\n                "all_ids": "array",\n                "new_empty_item": "\\Magento\\Framework\\DataObject",\n                "iterator": "\\ArrayIterator"\n            },\n            "salable": "bool",\n            "is_salable": "bool",\n            "custom_design_date": "array",\n            "request_path": "string",\n            "gift_message_available": "string",\n            "options": [\n                {\n                    "product_sku": "string",\n                    "option_id": "int",\n                    "title": "string",\n                    "type": "string",\n                    "sort_order": "int",\n                    "is_require": "bool",\n                    "price": "float",\n                    "price_type": "string",\n                    "sku": "string",\n                    "file_extension": "string",\n                    "max_characters": "int",\n                    "image_size_x": "int",\n                    "image_size_y": "int",\n                    "values": "\\Magento\\Catalog\\Api\\Data\\ProductCustomOptionValuesInterface[]",\n                    "extension_attributes": "\\Magento\\Catalog\\Api\\Data\\ProductCustomOptionExtensionInterface"\n                }\n            ],\n            "preconfigured_values": {\n                "empty": "bool"\n            },\n            "identities": "array",\n            "id": "int",\n            "quantity_and_stock_status": "array",\n            "stock_data": "array"\n        }\n    }\n}\n')),(0,r.mdx)("h2",{id:"return-a-list-of-supported-webhook-event-names"},"Return a list of supported webhook event names"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:list:all")," command returns a list of events defined in the specified module that can be used as the trigger for a webhook."),(0,r.mdx)("h3",{id:"usage-1"},"Usage"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"bin/magento webhooks:list:all <module_name>")),(0,r.mdx)("h3",{id:"arguments-1"},"Arguments"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"<module_name>")," Required. Specifies the module to query."),(0,r.mdx)("h3",{id:"example-1"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento webhooks:list:all Magento_Sales\n")),(0,r.mdx)("h3",{id:"response-1"},"Response"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-terminal"},"observer.admin_sales_order_address_update\nobserver.adminhtml_customer_orders_add_action_renderer\nobserver.adminhtml_sales_order_create_process_data\nobserver.adminhtml_sales_order_create_process_data_before\nobserver.adminhtml_sales_order_create_process_item_after\n...\nplugin.magento.sales.api.creditmemo_comment_repository.delete\nplugin.magento.sales.api.creditmemo_comment_repository.save\nplugin.magento.sales.api.creditmemo_item_repository.delete\nplugin.magento.sales.api.creditmemo_item_repository.save\nplugin.magento.sales.api.creditmemo_management.cancel\n...\n")),(0,r.mdx)("h2",{id:"return-a-list-of-subscribed-webhooks"},"Return a list of subscribed webhooks"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:list")," command returns details about all subscribed webhooks. The response contains the webhook name and the type of plugin that calls the webhook, (",(0,r.mdx)("inlineCode",{parentName:"p"},"before")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"after"),"). The batch column of the response contains a list of hooks that can be executed in parallel."),(0,r.mdx)("h3",{id:"usage-2"},"Usage"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"bin/magento webhooks:list")),(0,r.mdx)("h3",{id:"example-2"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento webhooks:list\n")),(0,r.mdx)("h3",{id:"response-2"},"Response"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-terminal"},'ok | 10:25:24 AM\n+-------------------------------------------+--------+---------------------------------------------------------------------------+\n| name                                      | type   | batches                                                                   |\n+-------------------------------------------+--------+---------------------------------------------------------------------------+\n| observer.catalog_product_save_after       | after  | [                                                                         |\n|                                           |        |     [                                                                     |\n|                                           |        |         {                                                                 |\n|                                           |        |             "name": "product_updated",                                    |\n|                                           |        |             "url": "{env:APP_BUILDER_PROJECT_URL}\\/product-updated",      |\n|                                           |        |             "method": "",                                                 |\n|                                           |        |             "headers": [                                                  |\n|                                           |        |                 "x-gw-ims-org-id : {env:APP_BUILDER_IMS_ORG_ID}",         |\n|                                           |        |                 "Authorization : Bearer {env:APP_BUILDER_AUTH_TOKEN}",    |\n|                                           |        |                 "Magento\\\\WebhookModule\\\\Model\\\\AddProductToCartResolver" |\n|                                           |        |             ],                                                            |\n|                                           |        |             "fields": [                                                   |\n|                                           |        |                 "product.name : data.product.name",                       |\n|                                           |        |                 "product.category_ids : data.product.category_ids",       |\n|                                           |        |                 "product.sku : data.product.sku"                          |\n|                                           |        |             ]                                                             |\n|                                           |        |         }                                                                 |\n|                                           |        |     ]                                                                     |\n|                                           |        | ]                                                                         |\n| observer.checkout_cart_product_add_before | before | [                                                                         |\n|                                           |        |     [                                                                     |\n|                                           |        |         {                                                                 |\n|                                           |        |             "name": "validate_stock",                                     |\n|                                           |        |             "url": "http:\\/\\/localhost:8085\\/product-validate-stock",     |\n|                                           |        |             "method": "",                                                 |\n|                                           |        |             "headers": [                                                  |\n|                                           |        |                 "Magento\\\\WebhookModule\\\\Model\\\\AddProductToCartResolver" |\n|                                           |        |             ],                                                            |\n|                                           |        |             "fields": [                                                   |\n|                                           |        |                 "product.name : data.product.name",                       |\n|                                           |        |                 "product.category_ids : data.product.category_ids",       |\n|                                           |        |                 "product.sku : data.product.sku"                          |\n|                                           |        |             ]                                                             |\n|                                           |        |         }                                                                 |\n|                                           |        |     ]                                                                     |\n|                                           |        | ]                                                                         |\n+-------------------------------------------+--------+---------------------------------------------------------------------------+\n')),(0,r.mdx)("h2",{id:"generate-plugins"},"Generate plugins"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:generate:module")," command generates the ",(0,r.mdx)("inlineCode",{parentName:"p"},"AdobeCommerceWebhookPlugins")," module with plugins based on webhook registrations and places it into the Commerce ",(0,r.mdx)("inlineCode",{parentName:"p"},"app/code/Magento")," directory. This command is applicable for on-premises deployments only."),(0,r.mdx)("h3",{id:"usage-3"},"Usage"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"bin/magento webhooks:generate:module")),(0,r.mdx)("h3",{id:"example-3"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},"bin/magento webhooks:generate:module\n")),(0,r.mdx)("h3",{id:"response-3"},"Response"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-terminal"},"Module was generated in the app/code/Magento directory\n")),(0,r.mdx)("h2",{id:"emulate-webhook-execution"},"Emulate webhook execution"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks:dev:run")," command is used for development and testing purposes only. It emulates the execution of your registered webhook containing a custom payload with requiring changes to the Commerce application. ",(0,r.mdx)("a",{parentName:"p",href:"testing.md"},"Testing webhooks")," further describes how to run this command."),(0,r.mdx)("h3",{id:"usage-4"},"Usage"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"bin/magento webhooks:dev:run <webhook-name> <webhook-arguments-payload>")),(0,r.mdx)("h3",{id:"arguments-2"},"Arguments"),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"<webhook-name:type>")," Required. The combination of webhook name and type. The name must begin with either ",(0,r.mdx)("inlineCode",{parentName:"p"},"observer.")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"plugin."),". The ",(0,r.mdx)("inlineCode",{parentName:"p"},"type")," must be either ",(0,r.mdx)("inlineCode",{parentName:"p"},"before")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"after"),". Example: ",(0,r.mdx)("inlineCode",{parentName:"p"},"observer.checkout_cart_product_add_before:before")),(0,r.mdx)("p",null,(0,r.mdx)("inlineCode",{parentName:"p"},"<webhook-arguments-payload>")," Required. The webhook arguments payload in JSON format. The payload will be filtered according to the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fields")," rules defined in a ",(0,r.mdx)("inlineCode",{parentName:"p"},"webhooks.xml")," file before being sent to the webhook endpoint. This emulates how the real arguments will be filtered in the generated plugin for the webhook."),(0,r.mdx)("h3",{id:"example-4"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-bash"},'bin/magento webhooks:dev:run observer.checkout_cart_product_add_before:before \'{"data":{"product":{"sku":"simple-product","name":"Simple Product"}}}\'\n')),(0,r.mdx)("p",null,"The webhook endpoint receives the following payload, according to ",(0,r.mdx)("inlineCode",{parentName:"p"},"fields")," configured for the webhook:"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-json"},'{"product":{"name":"Simple Product","sku":"simple-product"}}\n')))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-webhooks-commands-md-f9549a037f59509a283d.js.map