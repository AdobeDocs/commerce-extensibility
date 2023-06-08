---
title: PageApp component
description: 
---

# PageApp component

The `PageApp` component displays an out-of-process page within the Commerce Admin UI using an `iframe`. The component uses a single prop, `extensionId`, to retrieve the title and URL of the page. It uses the page title to change the title of the current Admin UI page. And it uses the URL to load the page into the `iframe` it added to the Admin UI.

## PageApp Props

| Name          | Type     | Required | Default | Description                                     |
| ------------- | -------- | -------- | ------- | ----------------------------------------------- |
| `extensionId` | `string` | true     | null    | The id that identifies the out-of-process page. |

## PageApp Usage

The following example shows how to use the `PageApp` component within your extension. The example assumes that you have already created an `extensionsProvider` object that contains the extension configuration. For more information, see [Creating an extensions provider](../extensions-provider.md).

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Extensible, createExtensionRegistryProvider } from '@adobe/uix-host-react'
import { PageApp } from '@adobe/commerce-backend-ui-extensibility/components/PageApp';

// Your extension's async init function, main.

async function main(config) {
  const extensionsProvider = () => fetch(config.registryUrl)
    .then(providerConfig => providerConfig.json())
    .then((config) => {
      return createExtensionRegistryProvider(config)();
    }).catch (e => {
      console.error(e.message);
      return () => []
    });

// If the extensionId is defined and the uix-page-content element exists, 
// render the PageApp component, which returns an iframe that loads the page.

if (config.extensionId !== undefined && !!document.getElementById('uix-page-content')) {
  const contentElement = ReactDOM.createRoot(document.getElementById('uix-page-content'));
  contentElement.render(
    <React.StrictMode>
      <Extensible extensionsProvider={extensionsProvider}>
        <PageApp extensionId={config.extensionId}/>
      </Extensible>
    </React.StrictMode>
  );
}
```

**Usage explanation:**

- The `if` statement checks if the `config` object has an `extensionId` property and if an element with the ID `uix-page-content` exists in the Commerce Admin page.

- If the conditions are met, a `contentElement` constant is created using `ReactDOM.createRoot`, which is a new API introduced in React 18 that enables concurrent rendering. It takes a DOM element as an argument and returns a `Root` object that can be used to render React components.

- The `contentElement` is then used to render the `PageApp` component, which is wrapped in a `React.StrictMode` component. `StrictMode` is a tool for highlighting potential problems in a React application. It activates additional checks and warnings for its descendants.
  
- The `PageApp` component takes one prop: `extensionId`. This is the ID that identifies the out-of-process page. The `PageApp` component uses this ID to retrieve the title and URL of the page from the extension registry.
  
- The `PageApp` component is wrapped in an `Extensible` component, which provides the `PageApp` with the `config` data defined in the `extensionsProvider`. For more information, see [Creating an extensions provider](../extensions-provider.md).
