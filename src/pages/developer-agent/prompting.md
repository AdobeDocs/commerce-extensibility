---
title: Prompt crafting
description: Learn how to write effective prompts for the Commerce Developer Agent across the blueprint and Develop stages, with templates and anti-patterns to avoid.
keywords:
  - Developer Agent
  - Prompting
  - blueprint
---

# Prompt crafting

The Commerce Developer Agent is a reasoning system, not a search engine. The quality and specificity of your prompts directly affect the accuracy and scope of the blueprint and code artifacts it produces.

These suggestions provide practical guidance on how to write effective prompts across the blueprint and develop stages, along with annotated examples and common anti-patterns to avoid.

## Describe your intention

Tell the agent what you want to achieve, not how you think it should be implemented. The agent's responsibility is to reason about the best implementation approach. You are responsible for describing the business or technical goal clearly.

| Less effective | More effective |
| --- | --- |
| "Write a webhook for me" | "I need to validate order data before the Commerce operation completes and reject the request when required fields are missing." |
| "Write an event handler for me" | "I need to react when an order is placed and send the order payload to our external OMS with retry-safe error handling." |
| "Create a Commerce extension" | "Build an App Builder Commerce extension that listens to the order placed event, formats the order payload for NetSuite, and handles retryable delivery failures." |

### Provide relevant constraints

If you have constraints, such as compatibility requirements, existing code patterns, or third-party services, state them before generating the blueprint. Correcting constraints after code generation is more time-consuming and costly.

Useful constraints to mention:

* Target Commerce environment or edition, such as Adobe Commerce as a Cloud Service
* Commerce events, webhook use cases, or App Builder extension points the generated app should support
* External API endpoints, schemas, authentication requirements, or SDKs involved
* Data mapping, business configuration, or persistence requirements
* Supporting files or links, such as requirements, API documentation, examples, or existing code snippets
* Performance, security, compliance, or operational requirements
* Coding standards or architecture patterns your team follows

### One scope per blueprint

Blueprints work best when they have a clear, bounded scope. If you want to build multiple related features, consider generating them as separate blueprints within the same project and using the Develop stage to synthesize them.

Aim for one primary capability per blueprint. The agent performs better with focused scope than with vague, multi-goal prompts.

### Iterate with additional prompts

If the first blueprint or generated code is not quite right, refine it through conversation rather than starting over. The agent retains context and can make targeted adjustments.

```shell
Keep everything the same, but change the event handler to react when an order is saved instead of when an order is placed.
```

## Blueprint prompting

The blueprint stage is where you describe your intent and refine the architecture plan. Think of this as a technical design conversation.

### Starting prompts

<CodeBlock slots="heading, code" repeat="2" languages="shell, shell" text-indent="40px"/>

#### Migration development

```shell
Generate a migration blueprint for this custom price calculator module. The target should be an App Builder action that calls our pricing engine API and returns the calculated price to Commerce.

Review the assessed module and create a blueprint. I want to keep the core business logic but move the external API calls out of the PHP layer into an App Builder action.
```

#### Net-new development

```shell
I need to build a Commerce extension that adds a custom "preferred delivery date" field to the checkout and stores it on the order. Create a blueprint for this.

Design an App Builder integration that subscribes to Commerce order events and forwards them to Salesforce Commerce Cloud through their REST API.
```

### Refinement prompts

```shell
Explain why you recommended an event handler instead of a webhook.
Add merchant-configurable settings for the external system endpoint.
Add validation checks and tests to the implementation plan.
Challenge the assumptions in this blueprint and list any design gaps.
```

### Blueprint prompt effectiveness

An effective blueprint prompt:

* Clearly states the goal (what capability is being built)
* Mentions the supported workflow mode or extension mechanism if known, such as App Builder, Edge Delivery, events, or webhooks
* Includes relevant context (what existing code is involved, what external systems are integrated)
* Is specific about scope (one module, one capability, one integration)

## Development prompting

Once the blueprint is approved and the workspace is generated, the develop stage is when you refine, extend, or correct the generated artifacts.

### Targeted refinement prompts

```shell
Add error handling to the App Builder action. If the external API returns a 5xx response, log the error and return a retryable failure.
Make the log level merchant-configurable through Commerce App Management.
Update the event handler so duplicate order events are ignored safely.
Generate a README.md that explains setup, configuration, validation, and deployment steps.
```

### Code extension prompts

```shell
This looks good. Now add a second event handler for order cancellation events and send a cancellation payload to the OMS.
Add business configuration for the external API endpoint and credentials.
Add persistence for processed event IDs so repeated events are not processed twice.
```

### Asking for explanations

```shell
Walk me through the generated event handler and explain how it validates, transforms, and sends the Commerce event payload.
Why did you recommend an event-driven flow instead of a webhook for this requirement?
Which generated files should I review first before pushing this workspace to GitHub?
```

## Anti-patterns to avoid

| Anti-pattern | Why is it problematic | Suggested alternative |
| --- | --- | --- |
| **Vague scope** — "Build a Commerce extension" | No way for the agent to scope the blueprint | Describe the specific capability, target system, and expected behavior |
| **Contradictory constraints** — "Make it simple but cover all edge cases" | Forces the agent to make arbitrary trade-offs | Prioritize: simplicity first, then ask for edge case handling separately |
| **Implementation speculation** — "I think I need a webhook, can you make one?" | May produce the wrong pattern for the use case | Describe whether the operation needs synchronous validation or asynchronous event handling, and let the agent recommend the pattern |
| **Implicit context** — "Fix the issue from before" | The agent doesn't know what "the issue" is unless the agent states the issue | Be explicit: "The action is returning a 400 error, fix the payload serialization." |
| **Scope creep** — Adding new goals after blueprint review started | Inflates scope and may destabilize the plan | Keep the blueprint concise and use the develop stage for targeted changes after generation |
| **Over-prompting** — Long lists of requirements in a single message | Increases the chance of missed requirements | Break complex needs across multiple prompts |

## Prompt templates

Copy and modify the following templates as starting points:

<CodeBlock slots="heading, code" repeat="3" languages="shell, shell, shell" text-indent="40px"/>

#### Migration development

```shell
Generate a migration blueprint for the [ASSESSMENT_RECOMMENDATION_OR_MODULE].
Context: [brief description of what the assessed module does today]
Target: App Builder Commerce extension that [describe the target behavior]
Constraints: [events/webhooks, external APIs, data mappings, business configuration, persistence, compatibility requirements]
```

#### Net-new development

```shell
I need to build an App Builder Commerce extension that [describe the capability].
It should [describe key behaviors].
It needs to support [events, webhooks, business configuration, persistence, or external integrations].
External dependencies: [list APIs, services, schemas, credentials, or links]
```

#### Code refinement

```shell
The generated [FILE_NAME] has an issue: [describe the specific problem].
Please update it to [describe the desired behavior] while keeping [describe what should stay the same].
```

## Agent memory

Consider the following tips when working with the agent's memory:

* The agent "remembers" decisions and context within your project across sessions.
* If you return to a project and want the agent to recall a prior decision, you can reference it directly: "Use the same error handling pattern we defined in the last run."
* If you want to explore a different approach without losing your current work, mention it explicitly. This allows the agent to explore alternatives in conversation without committing them to the blueprint.
