---
sidebar_position: 1
---
# Security Best Practices

The Brane Database API is built in such a way that it's super fast and easy to set up, but that comes with some risks, since you may open accidentally footgun yourself in a couple ways. Here are some things to keep in mind when using and configuring your Database.

## Roles and Permissions

The Brane Database API is built with a simple role-based permission system. You define both the roles, and what those roles can do.

One of the main things you should take into consideration is how your app is deployed. If you have a standalone server build of your game, permissions become much easier to manage, since it allows you to create a "server user" that has full access to the database, and then create "client users" that have limited read-only access to most data. 

However if you are deploying an app where clients may act as game session hosts, you will need to be more careful with permissions, since you will need to allow clients to write data. In this case, you should be very careful with what data you allow clients to write, as unless you set up your server to validate and sanitize data.

An example of this is something like storing achievements. If you allow clients to write to an achievements property, that means a player may be able to modify their client to unlock all achievements instantly. Because of this, in scenarios where you don't have a server validating data, you should only allow clients to write to data that is not critical to the game's operation such as their preferences, avatar configuration, favorite color, etc.

We have plans for a system that will allow you to validate data with custom code on our servers and possibly define extra endpoints for your game to call, but for now, our suggestion is running a standalone server build of your game that can validate and sanitize data.