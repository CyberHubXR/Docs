
# The ApiResult Class

The `ApiResult` class is a wrapper around responses from the Database server, and it provides a way to check if the request was successful, process error messages and to get the data from the response.

## Properties

If the ApiResult contains data, it can be accessed through the `data` property. If the request was not successful, data will be null and an the error message can be accessed through the `error_message` property. 

Http status codes can be accessed through the `status` property.

For a generic way to check if the request was successful, the `IsSuccess` property can be used.

## Example Usage

```csharp

// Get or create a session with the database
DatabaseSession session = await DatabaseSession.GetActive();

// Get all properties of the current user
ApiResult<Dictionary<string, object>> userProperties = await session.GetUserProperties();

if (userProperties.IsSuccess) {
    // Do something with the data
    Debug.Log(userProperties.data);
} else {
    // Handle the error
    Debug.LogError($"Failed to get user properties with code {userProperties.status} and message: {userProperties.error_message}");
}

``` 