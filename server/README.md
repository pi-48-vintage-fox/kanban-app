# Fancy Server

## Features

- Easily manage your projects Kanban-style. 
- Real-time updates.
- xxx
- xxx



## RESTful API
 
**USERS** 
| Method | Route           | Description                             |
| ------ | --------------  | --------------------------------------- |
| POST   | /register       | Register an account                     |
| POST   | /login          | Logs user into the system               |
| POST   | /googleLogin    | Logs in user using Google Sign In       |
| GET    | /users          | Fetch organization's members data       |
| GET    | /users/:id      | Fetch a user's data                     |

**CATEGORIES**
| Method | Route           | Description                             |
| ------ | --------------  | --------------------------------------- |
| GET    | /categories     | Fetch organization board's categories   |
| POST   | /categories     | Add a new category                      |
| PATCH  | /categories/:id | Rename a category                       |
| DELETE | /categories/:id | Delete a category                       |

**TASKS**
| Method | Route           | Description                             |
| ------ | --------------  | --------------------------------------- |
| GET    | /tasks          | Fetch all organization's tasks          |
| GET    | /tasks/user     | Fetch a user's tasks                    |
| POST   | /tasks          | Create a task                           |
| GET    | /tasks/:id      | Fetch a task's details                  |
| PUT    | /tasks/:id      | Modify a task                           |
| PATCH  | /tasks/:id      | Change a task's category                |
| DELETE | /tasks/:id      | Delete a task                           |
 

## 1. Register An Account

| METHOD | URL       |
| ------ | --------- |
| POST   | /register |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields                  | Type   | Validation                                                   |
  | ----------------------- | ------ | ------------------------------------------------------------ |
  | email   **(required)**  | string | Must be a valid email address format                         |
  | password **(required)** | string | - Contains minimal 6 characters<br />- Must contain a number, an uppercase letter, and a lowercase letter |
  
  ```json
  {
      "email": "test@h8.com",
      "password": "Hacktiv8",
  }
  ```
  

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                                                   |
  | ---- | ---------------------------------- | --------------------------------------------------------- |
  | 201  | Successfully created a new account | An object containing successfully created account's email address |

  ```json
  {
      "email": "test@h8.com"
  }
  ```

  

- **Error Response**

  | Code | Description      | Returns                                |
  | ---- | ---------------- | -------------------------------------- |
  | 400  | Validation error | An object containing validation error messages |

  ```json
  { "msg": "Password length must be 6 characters or longer" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.post( "/register/", { email: "test@h8.com", password: "Hacktiv8" } )
  .done( result => {
    console.log(result);
  });
```



## 2. Logs User Into The System

| METHOD | URL    |
| ------ | ------ |
| POST   | /login |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields   | Type   | Description |
  | -------- | ------ | ----------- |
  | user     | string | User's email address or username |
  | password | string | User's password |

  ```json
  {
      "user": "test@h8.com",
      "password": "Hacktiv8"
  }
  or
  {
      "user": "test",
      "password": "Hacktiv8"
  }

  ```

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                                                     |
  | ---- | -------------------------------- | ----------------------------------------------------------- |
  | 200  | Successfully logged in to system | An object containing access token and user's avatar URL     |

  ```json
  {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJla29AbWFpbC5jb20iLCJpYXQiOjE2MDQ0MjY1ODN9.LEh6nyVlkyk3SR5-1fHSxJrZMXSJWiuwLRUjQKJCcHY",
      "avatar": "https://avatars.dicebear.com/api/jdenticon/test.svg"
  }
  ```

  

- **Error Response**

  | Code | Description                        | Returns                                            |
  | ---- | ---------------------------------- | -------------------------------------------------- |
  | 401  | Invalid email or password supplied | An object containing error message and status code |

  ```json
  { "status": 401,
    "msg": "Invalid email or password" 
  }
  ```

  | Code | Description           | Returns                                            |
  | ---- | --------------------- | -------------------------------------------------- |
  | 500  | Internal server error | An object containing error message and status code |

  ```json
  { "status": 500,
    "msg": "Internal server error" 
  }
  ```

**SAMPLE CALL**

```js
$.post( "/login", { user: "test", password: "Hacktiv8" } )
  .done( result => {
    console.log(result);
  });
```

## 4. Fetch organization members data

| METHOD | URL    |
| ------ | ------ |
| GET    | /users |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                          |
  | ---- | -------------------- | -------------------------------- |
  | 200  | Successful operation | An array of members data objects |

  ```json
    [
        {
            "id": 4,
            "name": "Didi",
            "email": "didi@mail.com",
            "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/didi.svg"
        },
        {
            "id": 5,
            "name": "Eko",
            "email": "eko@mail.com",
            "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/eko.svg"
        }
    ]
  ```
  
  

- **Error Response**

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/users/" )
  .done( result => {
    console.log(result);
  });
```



## 5. Get A User's Details

| METHOD | URL        |
| ------ | ---------- |
| GET    | /users/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description             |
  | ----------------------- | ------- | :---------------------- |
  | `id`   ***(required)*** | integer | ID of user to find      |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                        |
  | ---- | -------------------------------- | ------------------------------ |
  | 200  | Successfully found the user data | An object containing user data |

  

  ```json
  {
      "id": 4,
      "name": "Didi",
      "email": "didi@mail.com",
      "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/didi.svg"
  }
  ```

  

- **Error Response**

  | Code | Description             | Returns                                            | 
  | ---- | ----------------------- | -------------------------------------------------- |
  | 404  | User was not found      | An object containing status code and error message |

  ```json
  { "status": 404,
    "msg": "User was not found" 
  }
  ```

  

**SAMPLE CALL**

```js
$.get( "/users/1" )
  .done( result => {
    console.log(result);
  });
```


## 6. Fetch organization board's categories

| METHOD | URL         |
| ------ | ----------- |
| GET    | /categories |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                          |
  | ---- | -------------------- | -------------------------------- |
  | 200  | Successful operation | An array of members data objects |

  ```json
    [
        {
            "id": 4,
            "name": "Didi",
            "email": "didi@mail.com",
            "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/didi.svg"
        },
        {
            "id": 5,
            "name": "Eko",
            "email": "eko@mail.com",
            "avatarUrl": "https://avatars.dicebear.com/api/jdenticon/eko.svg"
        }
    ]
  ```
  
  

- **Error Response**

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/users/" )
  .done( result => {
    console.log(result);
  });
```

 
## 7. Add A New Category

| METHOD | URL         |
| ------ | ----------- |
| POST   | /categories |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields      | Type   | Description        | Notes                            |
  | ----------- | ------ | :----------------- | -------------------------------- |
  | name       | string | Category's name       |                                  |
  
  ```json
  {
      "name": "Released",
  }
  ```
  
**RESPONSES**

- **Success Response**

  | Code | Description                          | Returns                                     |
  | ---- | ------------------------------------ | ------------------------------------------- |
  | 201  | Successfully created a new category | An object containing successfully created category |

  ```json
  {
        "id": 15,
        "name": "Released",
        "OrganizationId": 1,
        "updatedAt": "2020-11-04T03:34:04.863Z",
        "createdAt": "2020-11-04T03:34:04.863Z"
    }
  ```

- **Error Response**

  | Code | Description      | Returns                                |
  | ---- | ---------------- | -------------------------------------- |
  | 409  | Validation error | An object containing validation error messages |

  ```json
  { "status": 409, 
    "msg": "Category with the same name already exists, please choose another name" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

**SAMPLE CALL**

```js

$.post( "/categories/", { name: "Released" } )
  .done( result => {
    console.log(result);
  });
```

## 8. Rename A Category

| METHOD | URL             |
| ------ | --------------- |
| PATCH  | /categories/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description              |
  | ----------------------- | ------- | :----------------------- |
  | `id`   ***(required)*** | integer | ID of category to rename |

- **Data Parameters**

  *None*

  ```json
  {
      "status": "done"
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                       | Returns                              |
  | ---- | --------------------------------- | ------------------------------------ |
  | 200  | Successfully renamed the category | An object containing success message |

  ```json
  {
      "msg": "Category was renamed successfully"
  }
  ```
  
  

- **Error Response**

  | Code | Description             | Returns                                |
  | ---- | ----------------------- | -------------------------------------- |
  | 404  | Category was not found | An object containing error message |

  ```json
  { "msg": "Category was not found" }
  ```

  | Code | Description  | Returns                           |
  | ---- | ------------ | --------------------------------- |
  | 500  | Server error | An object containing server error message |
  
  ```json
  { "msg": "Internal server error" }
  ```
  
  

**SAMPLE CALL**

```js
$.ajax({
    url: '/categories/1',
    type: 'UPDATE',
    data: { status: "done"},
    success: (result) => {
        console.log(result)
    }
});
```



## 9. Delete A Category

| METHOD | URL             |
| ------ | --------------- |
| DELETE | /categories/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description              |
  | ----------------------- | ------- | :----------------------- |
  | `id`   ***(required)*** | integer | ID of category to delete |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                       | Returns                              |
  | ---- | --------------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the category | An object containing success message |

  ```json
  {
      "msg": "Category was deleted successfully"
  }
  ```
  
  

- **Error Response**

  | Code | Description     | Returns                    |
  | ---- | --------------- | -------------------------- |
  | 404  | Not found error | An object containing error message |

  ```json
  { "msg": "Category was not found" }
  ```

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  {
  	"msg": "Internal server error"
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
    url: '/categories/1',
    type: 'DELETE',
    success: (result) => {
        console.log(result)
    }
});
```



## 10. Show All Organization's Tasks

| METHOD | URL    |
| ------ | ------ |
| GET    | /tasks |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                  |
  | ---- | -------------------- | ------------------------ |
  | 200  | Successful operation | An array of task objects |

  ```json
  [
    {
        "id": 5,
        "title": "Task 1",
        "description": "Description of Task 1",
        "CategoryId": 5,
        "UserId": 4,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:42.135Z",
        "updatedAt": "2020-11-03T16:43:42.135Z"
    },
    {
        "id": 6,
        "title": "Task 2",
        "description": "Description of Task 2",
        "CategoryId": 6,
        "UserId": 5,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:55.021Z",
        "updatedAt": "2020-11-03T16:43:55.021Z"
    }
  ]
  ```
  
- **Error Response**

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```


**SAMPLE CALL**

```js
$.get( "/tasks/" )
  .done( result => {
    console.log(result);
  });
```

## 11. Show A User's Tasks

| METHOD | URL         |
| ------ | ----------- |
| GET    | /tasks/user |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                  |
  | ---- | -------------------- | ------------------------ |
  | 200  | Successful operation | An array of task objects |

  ```json
  [
    {
        "id": 5,
        "title": "Task 1 by Budi",
        "description": "Description of Task 1",
        "CategoryId": 5,
        "UserId": 4,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:42.135Z",
        "updatedAt": "2020-11-03T16:43:42.135Z"
    },
    {
        "id": 6,
        "title": "Task 2 by Budi",
        "description": "Description of Task 2",
        "CategoryId": 6,
        "UserId": 4,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:55.021Z",
        "updatedAt": "2020-11-03T16:43:55.021Z"
    }
  ]
  ```
  
  

- **Error Response**

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/tasks/" )
  .done( result => {
    console.log(result);
  });
```





## 12. Add A New Task

| METHOD | URL         |
| ------ | ----------- |
| POST   | /task |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields      | Type    | Description        | Notes                            |
  | ----------- | ------- | :----------------- | -------------------------------- |
  | title       | string  | Task's title       |                                  |
  | description | string  | Task's description |                                  |
  | CategorId   | integer | Task's category ID |                                  |
  
  ```json
  {
      "title": "Task 1",
      "description": "Description of Task 1",
      "CategoryId": 5,
  }
  ```
  
**RESPONSES**

- **Success Response**

  | Code | Description                     | Returns                                     |
  | ---- | ------------------------------- | ------------------------------------------- |
  | 201  | Successfully created a new task | An object containing successfully created task |

  ```json
  {
        "id": 6,
        "title": "Task 2",
        "description": "Description of Task 2",
        "CategoryId": 6,
        "UserId": 5,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:55.021Z",
        "updatedAt": "2020-11-03T16:43:55.021Z"
    }
  ```

- **Error Response**

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object containing error message |

  ```json
  { "msg": "Internal server error" }
  ```

**SAMPLE CALL**

```js
const input = {
      title: "Task 1",
      description: "Description of Task 1",
      CategoryId: 5,
}

$.post( "/task", input )
  .done( result => {
    console.log(result);
  });
```

## 13. Find A Task By ID

| METHOD | URL        |
| ------ | ---------- |
| GET    | /tasks/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description        |
  | ----------------------- | ------- | :----------------- |
  | `id`   ***(required)*** | integer | ID of task to find |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                 | Returns                   |
  | ---- | --------------------------- | ------------------------- |
  | 200  | Successfully found the task | An object containing task |

  

  ```json
  {
        "id": 6,
        "title": "Task 2",
        "description": "Description of Task 2",
        "CategoryId": 6,
        "UserId": 5,
        "OrganizationId": 2,
        "createdAt": "2020-11-03T16:43:55.021Z",
        "updatedAt": "2020-11-03T16:43:55.021Z"
  }
  ```

  

- **Error Response**

  | Code | Description             | Returns                                |
  | ---- | ----------------------- | -------------------------------------- |
  | 404  | Task was not found | An object containing error message |

  ```json
  { "msg": "Task was not found" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/tasks/1" )
  .done( result => {
    console.log(result);
  });
```



## 14. Modify A Task

| METHOD | URL        |
| ------ | ---------- |
| PUT    | /tasks/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description              |
  | ----------------------- | ------- | :----------------------- |
  | `id`   ***(required)*** | integer | ID of category to modify |

- **Data Parameters**

  | Fields      | Type    | Description        | Notes                            |
  | ----------- | ------- | :----------------- | -------------------------------- |
  | title       | string  | Task's title       |                                  |
  | description | string  | Task's description |                                  |
  | CategoryId  | integer | Task's category ID |                                  |
  
  ```json
   {
        "id": 6,
        "title": "Modified title of Task 2",
        "description": "Modified description of Task 2",
        "CategoryId": 6,
  }
  ```

**RESPONSES**

- **Success Response**

  | Code | Description                         | Returns                             |
  | ---- | ----------------------------------- | ------------------------------------|
  | 200  | Successfully modified the category | An object containing success message |

  ```json
  {
      "msg": "Task modified successfully"
  }
  ```

- **Error Response**

  | Code | Description        | Returns                            |
  | ---- | ------------------ | ---------------------------------- |
  | 404  | Task was not found | An object containing error message |

  ```json
  { "msg": "Task was not found" }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |
  
  ```json
  { "msg": "Internal server error" }
  ```
  

**SAMPLE CALL**

```js
const data = {
      "id": 6,
      "title": "Modified title of Task 2",
      "description": "Modified description of Task 2",
      "CategoryId": 6,
    }

$.ajax({
    url: '/tasks/1',
    type: 'UPDATE',
    data: data,
    success: (result) => {
        console.log(result)
    }
});
```

## 15. Change A Task's Category

| METHOD | URL             |
| ------ | --------------- |
| PATCH  | /tasks/:id      |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description              |
  | ----------------------- | ------- | :----------------------- |
  | `id`   ***(required)*** | integer | ID of task to move       |

- **Data Parameters**

  *None*

  ```json
  {
      "CategoryId": 3
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                   | Returns                              |
  | ---- | ----------------------------- | ------------------------------------ |
  | 200  | Successfully renamed the task | An object containing success message |

  ```json
  {
      "msg": "Task was moved successfully"
  }
  ```
  
  

- **Error Response**

  | Code | Description        | Returns                            |
  | ---- | ------------------ | ---------------------------------- |
  | 404  | Task was not found | An object containing error message |

  ```json
  { "msg": "Task was not found" }
  ```

  | Code | Description  | Returns                           |
  | ---- | ------------ | --------------------------------- |
  | 500  | Server error | An object containing server error message |
  
  ```json
  { "msg": "Internal server error" }
  ```
  
  

**SAMPLE CALL**

```js
$.ajax({
    url: '/tasks/1',
    type: 'UPDATE',
    data: { CategoryId: 3},
    success: (result) => {
        console.log(result)
    }
});
```



## 16. Delete A Task

| METHOD | URL        |
| ------ | ---------- |
| DELETE | /tasks/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description          |
  | ----------------------- | ------- | :------------------- |
  | `id`   ***(required)*** | integer | ID of task to delete |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                   | Returns                              |
  | ---- | ----------------------------- | ------------------------------------ |
  | 200  | Successfully deleted the task | An object containing success message |

  ```json
  {
      "msg": "Task was deleted successfully"
  }
  ```
  
  

- **Error Response**

  | Code | Description     | Returns                            |
  | ---- | --------------- | ---------------------------------- |
  | 404  | Not found error | An object containing error message |

  ```json
  { "msg": "Task was not found" }
  ```

  | Code | Description  | Returns                            |
  | ---- | ------------ | ---------------------------------- |
  | 500  | Server error | An object containing error message |

  ```json
  {
  	"msg": "Internal server error"
  }
  ```

**SAMPLE CALL**

```js
$.ajax({
    url: '/tasks/1',
    type: 'DELETE',
    success: (result) => {
        console.log(result)
    }
});
```





