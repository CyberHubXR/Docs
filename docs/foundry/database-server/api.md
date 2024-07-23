# REST API

The database server works through a REST API. This API is used by both the Unity package and the website template we provide. We also support custom clients and integrations, thus why we provide this documentation.

## Handling Errors

All responses from the database server are in JSON format. If an error occurs, the response will be in the following format:

```json
{
  "code": integer, // The HTTP status code of the error
  "message": string, // A string version of the HTTP status code
  "errors": [ // An array of errors that occurred, usually only one, but can be more
    {
      "status": string, // Usually the same as the HTTP status code
      "detail": string, // A detailed message about the error, this is the one you want to show to the user
      "links": { // A link to the documentation or api for the error, usually not defined
        "about": string, // A link to the documentation for the error
        "type": string // A link to the api for the error
      }
    }
  ]
}
```

## Authentication

The database server uses a token-based authentication system. This means that you need to provide a valid bearer token in the `Authorization` header of your requests. The token is generated when you create a new user account.

### Signup 

This creates a new user account for the application corresponding to the provided app key.

#### Endpoint
```http
POST /auth/signup
```
#### Request Body
```json
{
  "app_key": string, // The app key of the application to register the user for 
  "email": string, // A valid email for this user
  "username": string, // A username for this user, must be unique case insensitive
  "password": string, // A password for this user
}
```

#### Response
```json
{
  "mesage": string, // A message indicating the result of the operation
}
```


### Login

This logs in a user and returns a token and refresh token that can be used to authenticate future requests.

#### Endpoint
```http
POST /auth/login
```

#### Request Body
```json
{
  "app_key": string, // The app key of the application to access
  "username": string, // The username of the user
  "password": string, // The password of the user
}
```

#### Response
```json
{
  "session_token": { // The token to use for authentication
    "token": string, // The token to use for authentication, must be provided in the Authorization header as a bearer token "Authorization: Bearer <token>"
    "expires_at": integer, // The time the token expires in seconds since the epoch

  }, 
  "refresh_token": {
    "token": string, // The refresh token to use to get a new token from the /auth/refresh endpoint
    "expires_at": integer, // The time the token expires in seconds since the epoch
  }, // The refresh token to use to get a new token
}
```


### Logout 

This logs out a user and invalidates the session token.

#### Endpoint
```http
POST /auth/logout
```

#### Headers
```http
Authorization: Bearer <session_token>
```

#### Request Body
```json
{
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Refresh Token

This refreshes a session token using a refresh token, this is useful for keeping a user logged in without having to re-enter their password. Will return a new session token and refresh token that can be used to authenticate future requests.

#### Endpoint
```http
POST /auth/refresh
```

#### Request Body
```json
{
  "refresh_token": string, // The refresh token to use to get a new token
}
```

#### Response
```json
{
  "session_token": { // The token to use for authentication
    "token": string, // The token to use for authentication, must be provided in the Authorization header as a bearer token "Authorization: Bearer <token>"
    "expires_at": integer, // The time the token expires in seconds since the epoch

  }, 
  "refresh_token": {
    "token": string, // The refresh token to use to get a new token from the /auth/refresh endpoint
    "expires_at": integer, // The time the token expires in seconds since the epoch
  }, // The refresh token to use to get a new token
}
```

### Change Password 

This changes the password of an authenticated user.

#### Endpoint
```http
POST /auth/change_pass
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "old_password": string, // The old password of the user, must be correct or the request will fail
  "new_password": string, // The new password of the user
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Forgot Password
This sends an email containing a reset code to be sent to the registered user with the passed in email address.

#### Endpoint
```http
POST /auth/reset
```

#### Request Body
```json
{
  "email": string, // The email address of the user
  "app_key": string, // The app key of the application
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Reset Password
This resets the password of a user to the passed in value, if the reset code matches the one given to them in the email.

#### Endpoint
```http
POST /auth/reset_code
```

#### Request Body
```json
{
  "reset_code": string, // The reset code given to the user in the email
  "new_password": string, // The new password of the user
  "app_key": string, // The app key of the application
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Verify Email
`// TODO`

## User

These endpoints are used to interact with users

### Get User

Used to grab common information about a user.

#### Endpoint
```http
GET /user
```
#### Query Parameters
```http
user_id: string, // The id of the user to get
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Response
```json
{
  "_id": string, // The id of the user
  "username": string, // The username of the user
  "email": string, // The email of the user, this will be hidden if the user is not the same as the one making the request or an admin
  "created_at": integer, // The time the user was created in rfc3339 format

  "roles": [ string ], // An array of roles the user has, use the /user/roles/defs endpoint to get the definitions of these roles
}
```

### Update User

Used to update the information of a user.

#### Endpoint
```http
POST /user/update
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "user_id": string, // OPTIONAL The id of the user to update, if not provided the user making the request will be updated
  "username": string, // OPTIONAL The new username of the user
  "email": string, // OPTIONAL The new email of the user
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Delete User
// TODO

### Search Users

Used to search for users based on a query.

#### Endpoint
```http
GET /user/search
```

#### Query Parameters
```http
username: string, // OPTIONAL Username to search for
email: string, // OPTIONAL Email to search for
roles: [ string ], // OPTIONAL An array of roles to filter by
start_index: integer, // OPTIONAL The start index of the search
count: integer, // OPTIONAL The number of results to return
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Response
```json
{
  "users": [ // An array of users that match the search
    {
      "_id": string, // The id of the user, can be used to get more information about the user
      "username": string, // The username of the user
    }
  ]
}
```

## User Roles 

This set of endpoints is used to manage user roles, and manage what roles a user has.

### Define Roles

Used to define or update roles in the system, also may be used to delete roles.

#### Endpoint
```http
POST /user/roles/define
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "define": [ // OPTIONAL An array of roles to define
    {
      <role name>: { // Key is the name of the role
        "permissions": [ string ] // An array of permissions the role has
      }, 
    }
  ],
  "delete": [ string ] // OPTIONAL An array of roles to delete
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Get Role Definitions 

Used to get the definitions of roles in the system.

#### Endpoint
```http
GET /user/roles/defs
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Response
```json
{
  "defs": { // An object of roles and their data
    <role name>: {
      "permissions": [ string ] // An array of permissions the role has
    }
  }
}
```

### Assign Roles

Used to assign roles to a user.

#### Endpoint
```http
POST /user/roles/add
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "user_id": string, // OPTIONAL The id of the user to assign roles to, if not provided the user making the request will be updated
  "roles": [ string ] // An array of roles to assign to the user
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Retract Roles

Used to retract roles from a user.

#### Endpoint
```http
POST /user/roles/remove
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "user_id": string, // OPTIONAL The id of the user to retract roles from, if not provided the user making the request will be updated
  "roles": [ string ] // An array of roles to retract from the user
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

## User Properties

This set of endpoints is used to manage user properties, and manage what properties a user has and their values.

### Define Properties

Used to define or update properties in the system, also may be used to delete properties.

#### Endpoint
```http
POST /user/props/define
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "define": [ // OPTIONAL An array of properties to define
    {
      <property name>: { // Key is the name of the property
        "get_roles": [ string ], // An array of roles that can access this property
        "set_roles": [ string ] // An array of roles that can set this property
      }, 
    }
  ],
  "delete": [ string ] // OPTIONAL An array of properties to delete definitions for
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```

### Get Property Definitions

Used to get the definitions of properties in the system.

#### Endpoint
```http
GET /user/props/defs
```

#### Query Parameters
```http
filter: [ string ], // OPTIONAL An array of property names to filter by
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Response
```json
{
  "defs": { // An object of properties and their data
    <property name>: {
      "get_roles": [ string ], // An array of roles that can access this property
      "set_roles": [ string ] // An array of roles that can set this property
    }
  }
}
```

### Set Properties

Used to set and delete properties for a user.

#### Endpoint
```http
POST /user/props/set
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "user_id": string, // OPTIONAL The id of the user to set properties for, if not provided the user making the request will be updated
  "props": { // An object of properties to set
    <property name>: json_value // The value of the property, can be any json value. If null the property will be deleted
  }
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```


### Get Properties

Used to get the properties of a user.

#### Endpoint
```http
POST /user/props/get
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "user_id": string, // OPTIONAL The id of the user to get properties for, if not provided the user making the request will be updated
  "props": [ string ], // OPTIONAL An array of properties to get, if not provided all properties will be returned
  "permissions": bool // OPTIONAL If true the permissions of the user will be returned as well
}
```

#### Response (permissions false)
```json
{
  "props": { // An object of properties and their values
    <property name>: json_value // The value of the property
  },
  
}
```

#### Response (permissions true)
```json
{
  "props": { // An object of properties and their values
    <property name>: {
      "value": json_value, // The value of the property
      "get_roles": [ string ], // An array of roles that can access this property
      "set_roles": [ string ] // An array of roles that can set this property (will not be defined if the user does not have permission to set the property)
  }
}
```
### Update Reset Email

Used to set and delete the reset email template of the application. Can only be done by admins and must be valid HTML with no scripts.

There are included `Wild Cards` that will be replaced with their corresponding value when the email is sent, these can be found [here](docs\foundry\unity-packages\foundry-core\database\configAndManagement.md#general).

#### Endpoint
```http
PUT /user/props/update_reset
```

#### Headers
```http
Authorization Bearer <session_token>
```

#### Request Body
```json
{
  "reset_email": string, // The HTML for the reset email template in the form of a string.
}
```

#### Response
```json
{
  "message": string, // A message indicating the result of the operation
}
```