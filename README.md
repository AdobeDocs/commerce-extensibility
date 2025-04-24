# Adobe Commerce Extensibility Developer Documentation

Welcome! This site contains the latest Adobe Commerce extensibility developer documentation for ongoing releases.

## Local development

This is a [Gatsby](https://www.gatsbyjs.com/) project that uses the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

To build the site locally:

1. Clone this repo.
1. Install project dependencies.

   ```bash
   yarn install
   ```

1. Launch the project in development mode.

   ```bash
   yarn dev
   ```

## Components

To achieve specific user experience goals for Commerce documentation, this repo shadows the [`Edition`](https://github.com/adobe/aio-theme/blob/main/packages/gatsby-theme-aio/src/components/Edition/index.js) original  component from the [`aio-theme`](https://github.com/adobe/aio-theme/) upstream repo.

### Edition

The `Edition` component displays a badge indicating whether a feature or functionality is available in specific Adobe Commerce environments. It has been customized to align with the badges that we use in Experience League docs.

#### Usage

```yaml
# Page-level (metadata)
edition: saas # For SaaS-only features
edition: paas # For PaaS-only features
```

```mdx
{/* Section-level (inline) */}
<Edition name="paas" />  {/* For PaaS-only features */}
<Edition name="saas" />  {/* For SaaS-only features */}
```

## Resources

See the following resources to learn more about using the theme:

- [Arranging content structure](https://github.com/adobe/aio-theme#content-structure)
- [Linking to pages](https://github.com/adobe/aio-theme#links)
- [Using assets](https://github.com/adobe/aio-theme#assets)
- [Configuring global navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Configuring side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Using content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Writing enhanced Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)
- [Deploying the site](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites) _(Adobe employees only)_

If you have questions, open an issue and ask us. We look forward to hearing from you!
