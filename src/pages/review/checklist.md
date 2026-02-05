---
title: Submission checklist
description: A comprehensive checklist to ensure your Commerce Extensibility app meets all requirements before submission.
keywords:
  - Extensibility
---

# Submission checklist

Before submitting your app, ensure it meets all requirements:

**Documentation requirements**

- [ ] Clear installation instructions for both PaaS and SaaS environments
- [ ] Configuration details for all environment variables
- [ ] Usage instructions explaining how to use the app post-installation
- [ ] Prerequisites listed (Admin UI SDK version, module dependencies)

**Security requirements**

- [ ] All runtime actions use `require-adobe-auth: true`
- [ ] No hardcoded secrets in code or configuration
- [ ] Webhooks protected by [signature verification](../webhooks/signature-verification.md)
- [ ] No critical or high vulnerabilities (`npm audit` passes)
- [ ] Repository is private if hosted on GitHub

**Project structure requirements**

- [ ] Updated `package.json` with app-specific name, version, and author
- [ ] Proper `app.config.yaml` configuration
- [ ] Commerce defined as a required product dependency
- [ ] Clean `.env.dist` file with all required variables
- [ ] Unused folders and files removed

**Testing requirements**

- [ ] All tests pass (`npm test`)
- [ ] Events are received and processed correctly
- [ ] Webhooks respond with proper format and timing
- [ ] Admin UI renders correctly
- [ ] Works on both PaaS and SaaS Commerce environments

<InlineAlert variant="warning" slots="text"/>

Apps must support both PaaS (Commerce on cloud infrastructure, on-premises) and SaaS (Commerce as a Cloud Service) deployments. See [Extension compatibility](./extension-compatibility.md) for guidance.
