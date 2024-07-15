---
sidebar_position: 0
---

# Overview

The Foundry Database SDK is a Unity package that provides a simple interface for interacting with the Foundry Database Server. It is built into the Foundry Core package, and provides a set of tools and examples to make building multi-user XR experiences easier.

## Setup

To use the Foundry Database, first make sure you have the CyberHub scoped registry set up in your project by following the instructions [here](/docs/foundry/unity-packages/installing-packages). Then you can install the "Foundry Core" package from the package manager.

We need to set up an App Key before being able to access anything. [Follow the instructions here](/docs/foundry/unity-packages/foundry-core/overview) for info on how to acquire and set the App Key.

Additionally, if you have been given a self-hosted server executable, you can set the server URL in the Foundry Core package config. By default, the package will use the managed server at `https://api.cyberhubxr.com`, but you can set it to your own server by navigating to `Foundry -> Config Manager` and setting the Api Override URL field under the Foundry Core section to your server's URL.

## Usage

* [Managing the database](./configAndManagement.md)
* [Tips on security](./security.md)
* [Setting up user roles](./userRoles.md)
