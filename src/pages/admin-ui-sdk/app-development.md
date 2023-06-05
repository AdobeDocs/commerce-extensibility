---
title: App development
description: Register the App in the App Registry
---

# App development

When the application on App Builder is ready to be published, a registration to the Adobe Registry is required to add a menu in the Admin Panel.

## Add or update the install.yml file

```yaml
$schema: http://json-schema.org/draft-07/schema
$id: https://adobe.io/schemas/app-builder-templates/1

categories:
  - action
  - ui

extensions:
  - extensionPointId: commerce/backend-ui/1
```

Note: Make sure you target the correct extensionPointId: `commerce/backend-ui/1`

## Add or update the extension-manifest.yml file

```yaml
{
  "name": "commerce-first-app",
  "displayName": "Commerce First App on App Builder",
  "description": "Commerce First App on App Builder",
  "platform": "web",
  "id": "commerce-first-app",
  "version": "1.0.0"
}
```

## Add an ExtensionRegistration component

In your components create an ExtensionRegistration that will register the menu configuration in the App Registry. The registration is done using the `adobe/uix-sdk` more specifically the `adobe-uix-guest` dependency.

1. Add the `uix-guest` dependency in the `package.json`

```json
"@adobe/uix-guest": "^<latest-version>"
```

2. Run npm install

```bash
npm install
```

3. Create an ExtensionRegistration.js file

```javascript
import { register } from '@adobe/uix-guest';

export default function ExtensionRegistration() {
  init().catch(console.error);
  return <></>;
}

const extensionId = 'commerce-first-app'

const init = async () => {
  await register({
    id: extensionId,
    debug: false,
    methods: {
      extension: {
        getId() {
          return 'commerce-first-app';
        }
      },
      menu: {
        getItems() {
          return [
            {
              id: 'ext_page',
              title: 'First App on App Builder',
              action: `uixpage/index/index/uix-ext/${extensionId}`,
              parent: 'Magento_Backend::marketing',
            },
          ];
        },
      },
      page: {
        getTitle() {
          return 'Commerce First App on App Builder';
        },
      },
    },
  });
};
```

Upon registration, the application should have the `extension:getId`, `menu:getItems`, and `page:getTitle` defined.

In this example, the application is registered to be accessed from the Marketing main menu in the Adobe Commerce.
The title displayed in the menu is one defined in the `getItems`, whereas the one displayed on page load is the one defined in the `getTitle`.

## Update the `App.js` routing

Add the correct Routing to your app. In the `App.js` file add the following route:

```javascript
<Route path={'index.html'} element={<ExtensionRegistration />} />
```

Note: Make sure that your main page is correctly routed to the index, here's an example of the first app routing in the `App.js` component:

```javascript
<ErrorBoundary onError={onError} FallbackComponent={fallbackComponent}>
  <BrowserRouter>
      <Provider theme={lightTheme} colorScheme={'light'}>
          <Routes>
              <Route path={'index.html'} element={<ExtensionRegistration />} />
              <Route index element={<MainPage runtime={props.runtime} ims={props.ims} />} />
          </Routes>
      </Provider>
  </BrowserRouter>
</ErrorBoundary>
```

## Update the `app.config.yaml` file

The `app.config.yml` file is the configuration file for the application. Update this file as follows:

```yaml
extensions:
  commerce/backend-ui/1:
    $include: ext.config.yaml
```

This file now declares extensions and redirects to an `ext.config.yaml`

## Add or update the `ext.config.yaml`

Your extension config file should look like this:

```yaml
operations:
  view:
    - type: web
      impl: index.html
actions: actions
web: web-src
runtimeManifest:
  packages:
    SampleExtension:
      license: Apache-2.0
      actions:
```

Complete this file with the actions from your app.
