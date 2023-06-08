---
title: MenuApp component
description: 
---

# MenuApp component

The `MenuApp` component adds a menu item to the Commerce Admin UI menu page. The component selects the DOM element on the Admin menu page that matches the string value for its `rootElmSelector` prop. That element is where the MenuApp component renders a new menu item with the URL to the App Builder page where new Commerce features can be added out-of-process.

## MenuApp Props

| Name              | Type     | Required | Default | Description                                 |
| ----------------- | -------- | -------- | ------- | ------------------------------------------- |
| `menuHtmlUrl`     | `string` | true     | null    | URL to the App Builder page.                |
| `rootElmSelector` | `string` | true     | null    | DOM element `id` on the Admin UI menu page. |

## MenuApp Usage

The following example shows how to use the `MenuApp` component within your extension. The example assumes that you have already created an `extensionsProvider` object that contains the extension configuration. For more information, see [Creating an extensions provider](../extensions-provider.md).

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Extensible, createExtensionRegistryProvider } from '@adobe/uix-host-react'
import { MenuApp } from '@adobe/commerce-backend-ui-extensibility/components/MenuApp';

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

const menuRootSelector = '#uix-menu-placeholder'
const menuElement = ReactDOM.createRoot(document.querySelector(menuRootSelector))
menuElement.render(
  <React.StrictMode>
    <Extensible extensionsProvider={extensionsProvider}>
      <MenuApp menuHtmlUrl={config.menuHtmlUrl} rootElmSelector={menuRootSelector}/>
    </Extensible>
  </React.StrictMode>
)
```

**Usage explanation:**

- The `menuRootSelector` defines the CSS selector for the element where the menu item will be rendered.
  
- The `menuElement` is the `Root` object React creates to render the `MenuApp` component. The `ReactDOM.createRoot` function (new to React 18) takes a DOM element (like the `menuRootSelector`) and returns a `Root` object it uses to render React components.
  
-  React renders the `MenuApp` component, which is wrapped in a `React.StrictMode` component. `StrictMode` is a tool for highlighting potential problems in a React application. It activates additional checks and warnings for its descendants.
  
- The `MenuApp` component takes two props: `menuHtmlUrl` and `rootElmSelector`. The `menuHtmlUrl` prop provides the URL to the out-of-process page that contains the content for the menu item. The `rootElmSelector` prop provides the CSS selector (defined in `menuRootSelector`) for the element where the menu item will be rendered.
  
- The `MenuApp` component is wrapped in an `Extensible` component, which provides the `MenuApp` with the `config` data defined in the `extensionsProvider`. For more information, see [Creating an extensions provider](../extensions-provider.md).
