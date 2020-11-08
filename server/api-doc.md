# kanban-app

List of available endpoints:
- `POST /register`
- `POST /login`
- `POST /task`
- `GET /task`
- `PUT /task/:id`
- `PATCH/task/:id`
- `DELETE /task/:id`

### POST /register

Request:

- data:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
- status: 201
- body:

```json
{
  "id": "integer",
  "email": "string",
}
```

### POST /login

Request:

- data:
```json
{
  "email": "string",
  "password": "string"
}
```

Response:
- status: 200
- body:
  ​
```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string",
}
```

### POST /task

description: 
  add user's task

Request:
- headers: access_token (string)
- body: 
```json
{
    "title": "string",
    "category": "string"
}
```

Response:
- status: 201
- body:

```json
{ 
    "id": "integer",
    "title": "string",
    "category": "string",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

### GET /task

description: 
  show all Tasks

Request:
- headers: access_token (string)

Response:
- status: 200
- body:

```json
[
    { 
        "id": "integer",
        "title": "string",
        "category": "string",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
### PUT /task/:id
description: 
  update task

Request:
- headers: access_token (string)
- body:

```json
[
    { 
        "id": "integer",
        "title": "string",
        "category": "string",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
]

Response:
- status: 200
- body:

```json
[
    { 
        "id": "integer",
        "title": "string",
        "category": "string",
        "UserId": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
### PATCH/task/:id
description: 
  update category

Request:
- headers: access_token (string)
- body:

```json
[
    { 
        "category": "string",
    }
]

Response:
- status: 200
- body:

```json
[
    { 
        "category": "string",
    }
]
```
### DELETE /task/:id

description: 
  delete wishlist by wishListId

Request:
- headers: access_token (string)
- params: 
  - id: "integer" required

Response:
- status: 200
- body:

```json
{
    "message": "Successfully delete Task",
}
```