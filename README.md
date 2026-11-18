# Adobe Commerce Extensibility Documentation

This repository contains the code for the [Commerce Extensibility documentation](https://developer.adobe.com/commerce/extensibility/) website. It is built using [Adobe Edge Delivery Services](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/overview) and deployed to [Adobe Developer](https://developer.adobe.com/commerce/extensibility/).

The site covers APIs and tools for extending and customizing Adobe Commerce, including App Builder integrations, event-driven architecture, API mesh, webhooks, and out-of-process extensibility patterns.

## Quick start

For local development, you need to start three servers:

1. **Content server** (this repo):

   ```bash
   npm run dev
   ```

2. **Code server** ([adp-devsite](https://github.com/AdobeDocs/adp-devsite)):

   ```bash
   git clone https://github.com/AdobeDocs/adp-devsite
   cd adp-devsite
   npm install
   npm run dev
   ```

3. **Runtime connector** ([devsite-runtime-connector](https://github.com/aemsites/devsite-runtime-connector)):

   ```bash
   git clone https://github.com/aemsites/devsite-runtime-connector
   cd devsite-runtime-connector
   npm install
   npm run dev
   ```

Once all three servers are running, navigate to `http://localhost:3000/commerce/extensibility`.

For common utilities and documentation, see the [centralized README](https://github.com/AdobeDocs/adp-devsite-utils/blob/main/README.md).

## Testing and linting

### Markdown linting

To lint Markdown files before pushing:

```bash
npm run lint:md
```

To automatically fix linting errors:

```bash
npm run lint:md:fix
```

### Content validation

To check internal and external links, validate front matter, and more:

```bash
npm run lint
```

### TOC validation

To validate the table of contents file:

```bash
npm run test:config
```
