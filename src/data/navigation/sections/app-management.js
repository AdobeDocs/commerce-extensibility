module.exports = [
    {
        title: "Overview",
        path: "/app-management/index.md"
    },
    {
        title: "Initialize your app",
        path: "/app-management/initialize-app.md"
    },
    {
        title: "Define your app",
        path: "/app-management/define-app.md",
        pages: [
            {
                title: "App metadata",
                path: "/app-management/app-metadata.md"
            },
            {
                title: "Business configuration",
                path: "/app-management/configuration-schema.md"
            },
            {
                title: "Installation",
                path: "/app-management/installation/index.md",
                pages: [
                    {
                        title: "Events",
                        path: "/app-management/installation/events.md",
                    },
                    {
                        title: "Webhooks",
                        path: "/app-management/installation/webhooks.md"
                    },
                    {
                        title: "Admin UI SDK",
                        path: "/app-management/installation/admin-ui-sdk.md"
                    },
                    {
                        title: "Customize",
                        path: "/app-management/installation/customize.md"
                    },
                ],
            },
        ],
    },
    {
        title: "Build and deploy",
        path: "/app-management/build-deploy.md"
    },
    {
        title: "Troubleshooting",
        path: "/app-management/troubleshooting.md"
    },
    {
        title: "Release notes",
        path: "/app-management/release-notes.md"
    },
];
