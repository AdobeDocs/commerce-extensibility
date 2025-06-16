The following example creates and registers a conditional event named `plugin.magento.catalog.model.resource_model.product.save_low_stock_event`. Its parent is `plugin.magento.catalog.model.resource_model.product.save`. It defines rules that trigger when all of the conditions are true:

*  The value of `qty` is less than 20
*  The `category_id` is either 3, 4, or 5
*  The product `name` contains `TV`
*  The `store_id` of product category is either 1 or 2

These fields are present and declared in the parent event.
