# Fancy Todo Server

## Features

- A sophisticated Todo App Server where you can create todo lists for multiple projects. 
- Invite other people to become a member of your project.
- Get notified (or not) via email when a todo task is created.
- Register using your Google account



## RESTful API
 
**USERS** 
| Method | Route           | Description                             |
| ------ | --------------  | --------------------------------------- |
| POST   | /register       | Register an account                     |
| POST   | /login          | Logs user into the system               |
| POST   | /googleLogin    | Logs in user using Google Sign In       |
| GET    | /users          | Fetch organization's members data       |
| GET    | /users/:id      | Logs user into the system               |

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
 
 
 
## 1. Add A New Todo Task

| METHOD | URL    |
| ------ | ------ |
| POST   | /todos |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields      | Type   | Description        | Notes                            |
  | ----------- | ------ | :----------------- | -------------------------------- |
  | title       | string | Task's title       |                                  |
  | description | string | Task's description |                                  |
  | status      | string | Task's status      | "in progress" \| "done"          |
  | due_date    | date   | Task's due date    | Cannot be less than today's date |
  
  ```json
  {
      "title": "Buy some odadings",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "in progress",
    	"due_date": "2020-10-27T06:00:00.000Z"
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                          | Returns                                     |
  | ---- | ------------------------------------ | ------------------------------------------- |
  | 201  | Successfully created a new todo task | An object of successfully created todo task |

  ```json
  {
      "id": 1,
      "title": "Buy some odadings",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "in progress",
      "due_date": "2020-10-27T06:00:00.000Z"
  }
  ```
  
  

- **Error Response**

  | Code | Description      | Returns                                |
  | ---- | ---------------- | -------------------------------------- |
  | 400  | Validation error | An object of validation error messages |

  ```json
  { "message": "Due date has already passed" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object of error message |

  ```json
  { "message": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
const data = {
    id: 1,
    title: "Buy some odadings",
    description: "Buy 10 odadings for breakfast at Mang Oleh",
    due_date: "2020-10-27T06:00:00.000Z"
    }

$.post( "/todos/", data )
  .done( result => {
    console.log(result);
  });
```



## 2. Show All Todo Tasks

| METHOD | URL    |
| ------ | ------ |
| GET    | /todos |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

**RESPONSES**

- **Success Response**

  | Code | Description          | Returns                       |
  | ---- | -------------------- | ----------------------------- |
  | 200  | Successful operation | An array of todo task objects |

  ```json
  [
      {
          "id": 1,
          "title": "Buy some odadings",
          "description": "Buy 10 odadings for breakfast at Mang Oleh",
          "status": "in progress",
          "due_date": "2020-10-27T06:00:00.000Z"
      },
      {
          "id": 2,
          "title": "Buy MORE odadings",
          "description": "Buy 5 more odadings at Mang Oleh",
          "status": "in progress",
          "due_date": "2020-10-27T13:30:00.000Z"
      },
      
  ]
  ```
  
  

- **Error Response**

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object of error message |

  ```json
  { "message": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/todos/" )
  .done( result => {
    console.log(result);
  });
```



## 3. Find A Todo Task By ID

| METHOD | URL        |
| ------ | ---------- |
| GET    | /todos/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description             |
  | ----------------------- | ------- | :---------------------- |
  | `id`   ***(required)*** | integer | ID of todo task to find |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                |
  | ---- | -------------------------------- | ---------------------- |
  | 200  | Successfully found the todo task | An object of todo task |

  

  ```json
  {
      "id": 1,
      "title": "Buy some odadings",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "in progress",
      "due_date": "2020-10-27T06:00:00.000Z"
  }
  ```

  

- **Error Response**

  | Code | Description             | Returns                                |
  | ---- | ----------------------- | -------------------------------------- |
  | 404  | Todo task was not found | An object of "not found" error message |

  ```json
  { "message": "Todo task with id 1 was not found" }
  ```

  

**SAMPLE CALL**

```js
$.get( "/todos/1" )
  .done( result => {
    console.log(result);
  });
```



## 4. Modify A Todo Task

| METHOD | URL        |
| ------ | ---------- |
| PUT    | /todos/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description               |
  | ----------------------- | ------- | :------------------------ |
  | `id`   ***(required)*** | integer | ID of todo task to modify |

- **Data Parameters**

  | Fields      | Type   | Description        | Notes                            |
  | ----------- | ------ | :----------------- | -------------------------------- |
  | title       | string | Task's title       |                                  |
  | description | string | Task's description |                                  |
  | status      | string | Task's status      | "in progress" \| "done"          |
  | due_date    | date   | Task's due date    | Cannot be less than today's date |
  
  ```json
  {
      "title": "Buy nasi uduk",
      "description": "Buy nasi uduk for breakfast at Ceu Popon",
      "status": "in progress",
    	"due_date": "2020-10-27T07:30:00.000Z"
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                         | Returns                                      |
  | ---- | ----------------------------------- | -------------------------------------------- |
  | 200  | Successfully modified the todo task | An object of successfully modified todo task |

  ```json
  {
      "id": 1,
      "title": "Buy nasi uduk",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "in progress",
      "due_date": "2020-10-27T07:30:00.000Z"
  }
  ```
  
  

- **Error Response**

  | Code | Description      | Returns                                |
  | ---- | ---------------- | -------------------------------------- |
  | 400  | Validation error | An object of validation error messages |

  ```json
  { "message": "Due date has already passed" }
  ```

  | Code | Description             | Returns                                |
  | ---- | ----------------------- | -------------------------------------- |
  | 404  | Todo task was not found | An object of "not found" error message |

  ```json
  { "message": "Todo task with id 1 was not found" }
  ```

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object of error message |
  
  ```json
  { "message": "Internal server error" }
  ```
  
  

**SAMPLE CALL**

```js
const data = {
    id: 1,
    title: "Buy nasi uduk",
    description: "Buy nasi uduk for breakfast at Ceu Popon",
    due_date: "2020-10-27T06:00:00.000Z"
    }

$.ajax({
    url: '/todos/1',
    type: 'UPDATE',
    data: data,
    success: (result) => {
        console.log(result)
    }
});
```



## 5. Update A Todo Task's Status

| METHOD | URL        |
| ------ | ---------- |
| PATCH  | /todos/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description               |
  | ----------------------- | ------- | :------------------------ |
  | `id`   ***(required)*** | integer | ID of todo task to update |

- **Data Parameters**

  | Fields | Type   | Description   | Notes                   |
  | ------ | ------ | :------------ | ----------------------- |
  | status | string | Task's status | "in progress" \| "done" |

  ```json
  {
      "status": "done"
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                                 | Returns                                     |
  | ---- | ------------------------------------------- | ------------------------------------------- |
  | 200  | Successfully updated the todo task's status | An object of successfully updated todo task |

  ```json
  {
      "id": 1,
      "title": "Buy some odadings",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "done",
      "due_date": "2020-10-27T06:00:00.000Z"
  }
  ```
  
  

- **Error Response**

  | Code | Description      | Returns                               |
  | ---- | ---------------- | ------------------------------------- |
  | 400  | Validation error | An object of validation error message |

  ```json
  { "message": "Invalid status. Must be 'in progress' or 'done'" }
  ```

  | Code | Description             | Returns                                |
  | ---- | ----------------------- | -------------------------------------- |
  | 404  | Todo task was not found | An object of "not found" error message |

  ```json
  { "message": "Todo task with id 1 was not found" }
  ```

  | Code | Description  | Returns                           |
  | ---- | ------------ | --------------------------------- |
  | 500  | Server error | An object of server error message |
  
  ```json
  { "message": "Internal server error" }
  ```
  
  

**SAMPLE CALL**

```js
$.ajax({
    url: '/todos/1',
    type: 'UPDATE',
    data: { status: "done"},
    success: (result) => {
        console.log(result)
    }
});
```



## 6. Delete A Todo Task

| METHOD | URL        |
| ------ | ---------- |
| DELETE | /todos/:id |

**PARAMETERS**

- **URL Parameters**

  | Name                    | Type    | Description               |
  | ----------------------- | ------- | :------------------------ |
  | `id`   ***(required)*** | integer | ID of todo task to update |

- **Data Parameters**

  *None*
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                                     |
  | ---- | ---------------------------------- | ------------------------------------------- |
  | 200  | Successfully deleted the todo task | An object of successfully deleted todo task |

  ```json
  {
      "id": 1,
      "title": "Buy some odadings",
      "description": "Buy 10 odadings for breakfast at Mang Oleh",
      "status": "done",
      "due_date": "2020-10-27T06:00:00.000Z"
  }
  ```
  
  

- **Error Response**

  | Code | Description     | Returns                    |
  | ---- | --------------- | -------------------------- |
  | 404  | Not found error | An object of error message |

  ```json
  { "message": "Todo task with id 1 was not found" }
  ```

  | Code | Description  | Returns                    |
  | ---- | ------------ | -------------------------- |
  | 500  | Server error | An object of error message |

  ```json
  {
  	"message": "Internal server error"
  }
  ```

  

**SAMPLE CALL**

```js
$.ajax({
    url: '/todos/1',
    type: 'DELETE',
    success: (result) => {
        console.log(result)
    }
});
```



## 7. Register An Account

| METHOD | URL       |
| ------ | --------- |
| POST   | /register |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields                 | Type   | Validation                                                   |
  | ---------------------- | ------ | ------------------------------------------------------------ |
  | email   **(required)** | string | Must be a valid email address format                         |
  | password **(required)** | string | - Contains minimal 6 characters<br />- Must contain a number, an uppercase letter, and a lowercase letter |
  | name                   | string |                                                              |
  | username               | string | - Contains minimal 3 characters<br />- Contains only alphanumeric characters  [a-z, A-Z, 0-9] |
  
  ```json
  {
      "email": "test@h8.com",
      "password": "Hacktiv8",
   	"name" : "Budi",
      "username": "budi99"
  }
  ```
  
  

**RESPONSES**

- **Success Response**

  | Code | Description                        | Returns                                                   |
  | ---- | ---------------------------------- | --------------------------------------------------------- |
  | 201  | Successfully created a new account | An object of successfully created account's email address |

  ```json
  {
      "email": "test@h8.com"
  }
  ```

  

- **Error Response**

  | Code | Description      | Returns                                |
  | ---- | ---------------- | -------------------------------------- |
  | 400  | Validation error | An object of validation error messages |

  ```json
  { "message": "Password length must be 6 characters or longer" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object of error message |

  ```json
  { "message": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.post( "/register/", { email: "test@h8.com", password: "Hacktiv8" } )
  .done( result => {
    console.log(result);
  });
```



## 8. Logs User Into The System

| METHOD | URL    |
| ------ | ------ |
| POST   | /login |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  | Fields   | Type   |
  | -------- | ------ |
  | email    | string |
  | password | string |

  ```json
  {
      "email": "test@h8.com",
      "password": "Hacktiv8"
  }
  ```

  

**RESPONSES**

- **Success Response**

  | Code | Description                      | Returns                                                     |
  | ---- | -------------------------------- | ----------------------------------------------------------- |
  | 200  | Successfully logged in to system | An object of successfully logged in account's email address |

  ```json
  {
      "email": "test@h8.com"
  }
  ```

  

- **Error Response**

  | Code | Description                        | Returns                          |
  | ---- | ---------------------------------- | -------------------------------- |
  | 400  | Invalid email or password supplied | An object of login error message |

  ```json
  { "message": "Invalid email or password" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object of error message |

  ```json
  { "message": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.post( "/login/", { email: "test@h8.com", password: "Hacktiv8" } )
  .done( result => {
    console.log(result);
  });
```



## 9. Logs Out From System

| METHOD | URL     |
| ------ | ------- |
| GET    | /logout |

**PARAMETERS**

- **URL Parameters**

  *None*

- **Data Parameters**

  *None*

  

**RESPONSES**

- **Success Response**

  | Code | Description                             | Returns                                                      |
  | ---- | --------------------------------------- | ------------------------------------------------------------ |
  | 200  | Successfully logged out from the system | An object of successfully logged out account's email address |

  ```json
  {
      "email": "test@h8.com"
  }
  ```

  

- **Error Response**

  | Code | Description                        | Returns                          |
  | ---- | ---------------------------------- | -------------------------------- |
  | 400  | Invalid email or password supplied | An object of login error message |

  ```json
  { "message": "Invalid email or password" }
  ```

  | Code | Description           | Returns                    |
  | ---- | --------------------- | -------------------------- |
  | 500  | Internal server error | An object of error message |

  ```json
  { "message": "Internal server error" }
  ```

  

**SAMPLE CALL**

```js
$.post( "/login/", { email: "test@h8.com", password: "Hacktiv8" } )
  .done( result => {
    console.log(result);
  });
```



