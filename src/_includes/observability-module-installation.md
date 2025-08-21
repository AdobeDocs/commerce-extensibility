<Edition name="paas" />

### Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

### Installation

To install observability module in Adobe Commerce:

1. Run the following command to install the modules:

   ```bash
   composer require magento/module-out-of-process-observability=^1.0.0 --with-dependencies
   ```

1. Enable the new module:

   ```bash
   bin/magento module:enable Magento_OutOfProcessObservability
   ```

1. For on-premises installations, run the following command to upgrade Adobe Commerce and clear the cache.

   ```bash
   bin/magento setup:upgrade && bin/magento cache:clean
   ```
