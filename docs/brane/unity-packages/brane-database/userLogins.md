---
sidebar_position: 3
---

# Handling User Logins

Most login related functionality is as simple as single function calls, it's up to you to decide how you want to handle the UI and flow of your login system.

Most api calls are locked behind a login, so you'll need to log in before you can do anything of value with the database.

## Logging In

To log in, you can use the `Login` function. This function takes a `string` for the username and a `string` for the password. If the login is successful, the DatabaseSession automatically fetches most of the commonly used data for the user, such as their username and roles.

```csharp

public async void ExampleLogin()
{)
    // Get or create a session with the database
    DatabaseSession session = await DatabaseSession.GetActive();

    // Check if we're already logged in, as when we call GetActive, it will attempt to log in with the saved credentials
    if (session.LoggedIn) {
        Debug.Log("Already logged in");

        UserDoc user = session.LocalUser;
        Debug.Log($"Logged in as {user.username} with roles {user.roles}");
        return;
    }

    // Attempt to log in
    ApiResult loginResult = await session.Login("username", "password");

    if (loginResult.IsSuccess) {
        // Do something with the data

        UserDoc user = session.LocalUser;
        Debug.Log($"Logged in as {user.username} with roles {user.roles}");
    } else {
        // Handle the error
        Debug.LogError($"Failed to log in with code {loginResult.status} and message: {loginResult.error_message}");
    }
}

```

## Logging Out

To log out, you can use the `Logout` function. This ends the current session server side and clears the local session data. Additionally you can pass `true` to the `Logout` function to clear the saved credentials.
```csharp

public async void ExampleLogout()
{
    // Get or create a session with the database
    DatabaseSession session = await DatabaseSession.GetActive();

    // Check if we're already logged out
    if (!session.LoggedIn) {
        Debug.Log("Already logged out");
        return;
    }

    // Attempt to log out
    ApiResult logoutResult = await session.Logout();

    if (logoutResult.IsSuccess) {
        // Do something with the data
        Debug.Log("Logged out");
    } else {
        // Handle the error
        Debug.LogError($"Failed to log out with code {logoutResult.status} and message: {logoutResult.error_message}");
    }
}   

```