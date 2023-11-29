module.exports = [
    {
      title: "Overview",
      path: "/admin-ui-sdk/index.md"
    },
    {
      title: "Installation",
      path: "/admin-ui-sdk/installation.md"
    },
    {
      title: "App UI registration",
      path: "/admin-ui-sdk/app-registration.md"
    },
    {
      title: "Extension points",
      path: "/admin-ui-sdk/extension-points/index.md",
      pages: [
        {
          title: "menu",
          path: "/admin-ui-sdk/extension-points/menu.md"
        },
        {
          title: "order",
          path: "/admin-ui-sdk/extension-points/order.md",
          pages: [
            {
              title: "grid column",
              path: "/admin-ui-sdk/extension-points/grid-columns.md"
            },
            {
              title: "mass action",
              path: "admin-ui-sdk/extension-points/mass-action.md"
            },
            {
              title: "view button",
              path: "admin-ui-sdk/extension-points/view-button.md"
            }
          ]
        },
        {
          title: "page",
          path: "/admin-ui-sdk/extension-points/page.md"
        },
        {
          title: "product",
          path: "/admin-ui-sdk/extension-points/product.md"
        }

      ]
    },
    {
      title: "Admin configuration and local testing",
      path: "/admin-ui-sdk/configuration.md"
    },
    {
      title: "Prepare your app for production",
      path: "admin-ui-sdk/publish.md"
    },
    {
      title: "Troubleshooting",
      path: "/admin-ui-sdk/troubleshooting.md"
    },
    {
      title: "Release notes",
      path: "/admin-ui-sdk/release-notes.md"
    }
  ];