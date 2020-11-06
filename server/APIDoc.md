# API DOCUMENTATION 

List Endpoints :
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /task`
- `POST /task`
- `PUT /task/:id`
- `PATCH /task/:id`
- `DELETE /task/:id`

### POST /register :

Request:
body : 

```json
{
    "title": "yogi@mail.com",
    "password": "yogi123",
}
```

Response:
status code(201)

```json
{
    "id": 4,
    "email": "yogi@mail.com"
}
```

JIKA ERROR
- VALIDASI 
: Response: status code(500)
```json
"Validation error: Format input must be Email ex. xxx@mail.com"
"email must be unique"
"Validation error: Email must be Input",
"Validation error: Password must be Input"
"Validation error: Password must be length of 6 character"
```

### POST /login :

Request:
body : 

```json
{
    "title": "yogi@mail.com",
    "password": "yogi123",
}
```

Response:
status code(200)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Email / password is wrong ..!"
```

### POST /googleLogin :

Request:
body : 

```json
{
   "google_access_token": "",
}
```

Response:
status code(200)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

### GET /task :

Request:
body : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc"
}
```

Response:
status code(201)

```json
[
    {
        "id": 2,
        "title": "Create Client",
        "category": "todo",
        "UserId": 2,
        "createdAt": "2020-11-03T10:35:33.974Z",
        "updatedAt": "2020-11-03T11:17:41.400Z"
    },
    {
        "id": 3,
        "title": "OAuth google",
        "category": "backlog",
        "UserId": 1,
        "createdAt": "2020-11-03T14:09:54.847Z",
        "updatedAt": "2020-11-03T14:09:54.847Z"
    }
]
```

### POST /task :

Request:
body : 

```json
{
    "title": "Create Client",
    "category": "todo",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc",
   
}
```

Response:
status code(201)

```json
[
    {
        "id": 2,
        "title": "Create Client",
        "category": "todo",
        "UserId": 2,
        "createdAt": "2020-11-03T10:35:33.974Z",
        "updatedAt": "2020-11-03T11:17:41.400Z"
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(400)
```json
"Validation error: Title must be create",
"Validation error: Category must be create"
```

### PUT /task/:id :

Request:
params:
```json
id: [integer]
````
body : 

```json
{
    "title": "Create Client",
    "category": "todo",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc",
   
}
```

Response:
status code(201)

```json
[
    {
        "id": 2,
        "title": "Create Client",
        "category": "todo",
        "UserId": 2,
        "createdAt": "2020-11-03T10:35:33.974Z",
        "updatedAt": "2020-11-03T11:17:41.400Z"
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Title must be create",
"Validation error: Category must be create"
```

### PATCH /task/:id :

Request:
params:
```json
id: [integer]
````
body : 

```json
{
    "category": "todo",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc",
   
}
```

Response:
status code(201)

```json
[
    {
        "id": 2,
        "title": "Create Client",
        "category": "todo",
        "UserId": 2,
        "createdAt": "2020-11-03T10:35:33.974Z",
        "updatedAt": "2020-11-03T11:17:41.400Z"
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Category must be create"
```

### DELETE /task/:id :

Request:
params:
```json
id: [integer]
````
body : 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ5b2dpQG1haWwuY29tIiwiaWF0IjoxNjA0NDExNjI5fQ.vk2zyhtg9oPPCskOYu_koDLxEqirTQCwI_Xm_sK7fsc",
   
}
```

Response:
status code(200)

```json
[
    {
      "message": "Delete Task Successfuly"
    }
]
```

JIKA ERROR
- VALIDASI 
: Response: status code(404)
```json
"Data Not Found"
```
: Response: status code(401)
```json
"NotAuthorize"
```
: Response: status code(400)
```json
"Validation error: Category must be create"
```
 
 