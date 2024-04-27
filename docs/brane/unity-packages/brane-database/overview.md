---
sidebar_position: 0
---

# Overview

The Brane Database Package is a Unity package that provides a simple interface for interacting with the Brane Database Server. It is built on top of the Brane Core Package, and provides a set of tools and examples to make building multi-user XR experiences easier.

## Setup

To use the Brane Database Package, first make sure you have the CyberHub scoped registry set up in your project by following the instructions [here](/docs/brane/unity-packages/installing-packages). Then you can install the "Brane Database" package from the package manager.

This will also install the Brane Core package, which we need to set up with an App Key. [Follow the instructions here](/docs/brane/unity-packages/brane-core/overview) for info on how to acquire and set the App Key.

Additionally, if you have been given a self-hosted server executable, you can set the server URL in the Brane Core package config. By default, the package will use the managed server at `https://api.cyberhubxr.com`, but you can set it to your own server by navigating to `Brane -> Config Manager` and setting the `Override URL` field under the Brane Core section to your server's URL.

## Usage

* [Managing the database](./configAndManagement.md)
* [Tips on security](./security.md)
* [Setting up user roles](./userRoles.md)
