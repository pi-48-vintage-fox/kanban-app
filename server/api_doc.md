# Kanban

* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
` - POST /register `
` - POST /login `
` - POST /loginGoogle `
` - GET /tasks `
` - POST /tasks `
` - PUT /tasks/:id `
` - DELETE /tasks/:id `

### POST /register

> Register user

_Request Body_
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "user",
    "email": "user@mail.com",
    "access_token": "<access_token>"
}
```

_Response (400 - Bad Request)_
```json
{
    "name": "Bad Request",
    "message": "Validation error: Please input name,
     Validation error: Please input email,
     Validation error: Please input password"
}
```

_Response (500 - Internal server error)_
```json
{
    "name": "Internal Server Error",
    "message": "Validation error"
}
```
---

### POST /login

> Login user

_Request Body_
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200)_
```json
{
    "access_token": "<access_token>"
}
```

_Response (400 - Error validation)_
```json
{
    "name": "BadRequest",
    "message": "Wrong email/password"
}
```
---
### POST /loginGoogle

> Login user by Google login

_Request Body_
```json
{
  "google_token" : "string"
}
```

_Response (200 - Created)_
```json
{
    "access_token": "<access_token>"
}
```

---
### GET /tasks

> Get tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
[
    {
        "id": 2,
        "title": "Deploy Firebase",
        "category": "todo",
        "UserId": 4,
        "createdAt": "2020-08-12T15:49:45.448Z",
        "updatedAt": "2020-08-12T15:49:45.448Z"
    },
    ...
]
```

### POST /tasks

> Add tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "string",
  "category": "string"
}
```

_Response (201 - Created)_
```json
{
    "New Task": {
        "id": 5,
        "title": "Finish Kanban",
        "category": "completed",
        "UserId": 7,
        "updatedAt": "2020-08-12T15:49:45.448Z",
        "createdAt": "2020-08-12T15:49:45.448Z"
    }
}
```

_Response (404 - not found)_
```json
{
    "message": "todo not found"
}
```

_Response (500 - server error)_
```json
{
    "message": "server error"
}
```
### PUT /tasks/:id

> Put tasks by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<tasks id>"
}
```

_Request Body_
```json
{
  "title": "string",
  "category": "string"
}
```

_Response (200 - Updated)_
```json
{
    "updatedTask": [
        {
            "id": 5,
            "title": "Finish Kanban",
            "category": "doing",
            "UserId": 7,
            "updatedAt": "2020-08-12T15:49:45.448Z",
            "createdAt": "2020-08-12T15:49:45.448Z"
        }
    ]
}
```

_Response (403 - not authorize)_
```json
{
    "message": "Not allowed"
}
```

### DELETE /tasks/:id

> Delete tasks by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<tasks id>"
}
```

_Response (200 - Deleted)_
```json
{
    "message": "Delete completed"
}
```

_Response (401 - not authorize)_
```json
{
    "message": "Not allowed"
}
---