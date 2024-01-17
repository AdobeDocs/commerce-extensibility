---
title: App UI registration
description: Learn about registering your UI changes to the App Registry
keywords:
  - App Builder
  - Extensibility
---

# App UI registration

Your app must be correctly configured with Adobe App Registry to use the Admin UI SDK to create a custom UI in Commerce. You must perform the following steps before submitting your app to be published.

## Add or update the `install.yml` file

Create an `install.yml` file in the root of your project.

Make sure you target the correct `extensionPointId`: `commerce/backend-ui/1`

```yaml
$schema: http://json-schema.org/draft-07/schema
$id: https://adobe.io/schemas/app-builder-templates/1

categories:
  - action
  - ui

extensions:
  - extensionPointId: commerce/backend-ui/1
```

## Create or update the `extension-manifest.json` file

Create or update your project `extension-manifest.json` file so that it is similar to the following:

```json
{
  "name": "commerce-first-app",
  "displayName": "Commerce First App on App Builder",
  "description": "Commerce First App on App Builder",
  "platform": "web",
  "id": "commerce-first-app",
  "version": "1.0.0"
}
```

## Add an `ExtensionRegistration` component

Create an `ExtensionRegistration` React component that registers the menu configuration in the App Registry. Use the `adobe/uix-sdk` with the `adobe-uix-guest` dependency. The [UI Extensibility Getting Started](https://developer.adobe.com/uix/docs/getting-started/design/) guide describes this process further.

1. Add the `uix-guest` dependency in the `package.json`.

   ```json
   "@adobe/uix-guest": "^0.8.3"
   ```

2. Run `npm install`.

   ```bash
   npm install
   ```

3. Create an `ExtensionRegistration.js` file as follows:

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
        methods: {
          ...
        }
      }
    )
   }
   ```

You must populate the `methods` section with calls to fetch menus, pages, and other entities to be displayed in the Admin. [Extension Points](extension-points/index.md) provides reference information and examples.

## Update the `App.js` routing

Add the following route to your `App.js` file to define the correct routing to your app:

```javascript
<Route path={'index.html'} element={<ExtensionRegistration />} />
```

Make sure that your main page is correctly routed to the index. Here is an example of the first app routing in the `App.js` component:

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

Update the `app.config.yaml` [configuration file](https://developer.adobe.com/app-builder/docs/guides/configuration/) as follows:

```yaml
extensions:
  commerce/backend-ui/1:
    $include: ext.config.yaml
```

This file now declares extensions and redirects to an `ext.config.yaml` file.

## Add or update the `ext.config.yaml`

Your extension configuration file should look like this:

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
