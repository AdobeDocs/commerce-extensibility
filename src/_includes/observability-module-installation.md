<Edition name="paas" />

### Prerequisites

* Adobe Commerce on Cloud Infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* Magento Open Source is not supported.

<InlineAlert variant="info" slots="text"/>

Adobe Commerce as a Cloud Service (SaaS) has the observability module pre-installed and does not require any additional installation.

### Installation

To install the observability module in Adobe Commerce:

1. Install the module:

   ```bash
   composer require magento/module-out-of-process-observability=^1.0.0 --with-dependencies
   ```

1. Enable the installed module:

   ```bash
   bin/magento module:enable Magento_OutOfProcessObservability
   ```

1. For on-premises installations, run the following command to upgrade Adobe Commerce and clear the cache.

   ```bash
   bin/magento setup:upgrade && bin/magento cache:clean
   ```
