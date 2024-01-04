# Novu

Connery Plugin for the Novu Open Source Messaging API. Install this plugin on a [Connery Runner](https://docs.connery.io/docs/runner/quick-start/install-plugin-on-the-runner) to use an LLM to send SMS and Email messages using Novu.

## Get Started with Novu

Novu is an open-source messaging API that allows you to send SMS and Email messages using a large number of providers.

For a quick start introduction to Novu, check out the [Novu documentation](https://docs.novu.co/getting-started/introduction).

## Available actions

| Action                                  | Description                        |
| --------------------------------------- | ---------------------------------- |
| [Send SMS](/src/actions/sendSms.ts)     | Send an SMS text message with Novu |
| [Send Email](/src/actions/sendEmail.ts) | Send an Email via Novu             |

## Repository structure

The entry point for this plugin is the [./src/index.ts](/src/index.ts) file.
It contains the plugin definition and references to all the actions.

The [./src/actions/](/src/actions/) folder contains all the actions this plugin defines.
Every action is represented by a separate file with the action definition and implementation.

The [./dist/plugin.js](/dist/plugin.js) file is the bundled version of the plugin with all the dependencies.
Connery uses this file to run the plugin.

## Configuration

When [installing on a Connery Runner](https://docs.connery.io/docs/runner/quick-start/install-plugin-on-the-runner), this plugin requires the following configuration parameters:

- `novuApiKey` - API key from your Novu account
- `novuEmailTrigger` - Trigger name for your Novu send email workflow
- `novuSmsTrigger` - Trigger name for your Novu send sms workflow

See the [./src/index.ts](/src/index.ts) file for the full plugin definition.

## Connery

This repository is a plugin for [Connery](https://connery.io).

Connery is an open-source plugin ecosystem for AI and No-Code.

Learn more about Connery:

- [Documentation](https://docs.connery.io)
- [Source code](https://github.com/connery-io/connery-platform)
- [How to start using this plugin with Connery?](https://docs.connery.io/docs/platform/quick-start/)

## Support

If you have any questions or need help with this plugin, please create an issue in this repository.
