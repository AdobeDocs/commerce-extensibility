module.exports = [
  {
    title: "Overview",
    path: "/events/index.md"
  },
  {
    title: "Tutorials",
    path: "/events/tutorial/index.md",
    pages: [
      {
        title: "Eventing",
        path: "/events/tutorial/index.md",
        pages: [
          {
            title: "Use events and App Builder to extend Adobe Commerce",
            path: "/events/tutorial/index.md"
          },  
          {
            title: "Project setup and deployment",
            path: "/events/tutorial/deployment.md"
          },
          {
            title: "Set up event providers",
            path: "/events/tutorial/event-providers.md"
          },
          {
            title: "Debugging and development tips",
            path: "/events/tutorial/debugging.md"
          }
        ]
      },
      {
      title: "Journaling",
      path: "/events/journaling-tutorial/index.md",
      pages: [
        {
          title: "Integrate with Adobe I/O Events Journaling API",
          path: "/events/journaling-tutorial/index.md"
        },
        {
          title: "Register and validate your journaling integration",
          path: "/events/journaling-tutorial/registration-journaling-events.md"
        },
        {
          title: "Code development and deployment",
          path: "/events/journaling-tutorial/runtime-action-code-journaling-api.md"
        },
        {
          title: "Validate journaling events processing",
          path: "/events/journaling-tutorial/validating-journaling-integration.md"
        }
      ]
    }
  ]
},
  {
    title: "Create an App Builder project",
    path: "/events/project-setup.md",
  },
  {
    title: "Installation",
    path: "/events/installation.md",
  },
  {
    title: "Configure Adobe Commerce",
    path: "/events/configure-commerce.md",
  },
  {
    title: "Configure additional event providers",
    path: "/events/configure-additional-event-providers.md",
  },
  {
    title: "Create event subscriptions from the Admin",
    path: "/events/create-events.md",
  },
  {
    title: "Create event subscriptions in a module",
    path: "/events/module-development.md",
  },
  {
    title: "Create event subscriptions with original data",
    path: "/events/events-original-data.md",
  },
  {
    title: "Create conditional events",
    path: "/events/conditional-events.md",
  },
  {
    title: "Add custom fields",
    path: "/events/custom-event-fields.md"
  },
  {
    title: "Convert payload field values",
    path: "/events/convert-field-values.md"
  },
  {
    title: "Command reference",
    path: "/events/commands.md",
  },
  {
    title: "API reference",
    path: "/events/api.md",
  },
  {
    title: "Consume events",
    path: "/events/consume-events.md",
    pages: [
      {
        title: "Runtime action with a callback to Commerce",
        path: "/events/consume-events-examples/runtime-action-commerce-callback.md"
      }
    ]
  },
  {
    title: "Troubleshooting",
    path: "/events/troubleshooting.md",
  },
  {
    title: "Release notes",
    path: "/events/release-notes.md",
  }
];

