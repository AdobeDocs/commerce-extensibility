| Context                     | Context class                                     | Description                                                                               |
|-----------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------|
| `context_checkout_session`  | Magento\Checkout\Model\Session                    | Contains information about the current checkout session, including the current quote.     |
| `context_customer_session`  | Magento\Customer\Model\Session                    | Contains information about the current customer session, including the current customer.  |
| `context_application_state` | Magento\Framework\App\State                       | Contains information about current application mode and area code. |
| `context_scope_config`      | Magento\Framework\App\Config\ScopeConfigInterface | Provides access to the configuration settings for different scopes. |
| `context_http_request`      | Magento\Framework\App\Request\Http                | Provides access to the current HTTP request data. |
| `context_staging`           | Magento\Staging\Model\VersionManager              | Provides access to the staging version management functionalities. |
| `context_store`             | Magento\Store\Model\StoreManagerInterface         | Provides access to store-related information such as website, store, and store view. |
