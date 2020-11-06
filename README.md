# kanban-app

**kanban app**

----

```
 Manage All about kanban dan user
  - Create new todo
  - Show All todo
  - Update data todo
  - Delete data todo
```
  
* **RESTful API end point**

```
    POST   /tasks
    GET    /tasks
    GET   /tasks/:id
    PUT    /tasks/:id
    PATCH  /task/:id
    DELETE /tasks/:id

    POST /login
    POST /register
    POST /google-login
```



1. POST  `/tasks`

    `Creating new Tasks`
  
* **URL**

  `/Tasks`

* **Method:**
  
   `POST`
  
* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    title, 
    description, 
    category, 
    
  ```

  Request Body
    ```JSON
    {
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "category" : "backlog",
    }
    ```
 
* **Success Response:**

  
  * **Code:** 201 <br />
  * **Response:** 
  ```JSON
    {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "category" : "backlog",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:30:28.044Z"
    }
  ```
 
* **Error Response:**

    get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

2. GET  `/tasks`

    `Get All data tasks`

* **URL**

  `/todos`

* **Method:**
  
   `GET`

* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Body**

  `none`
 
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "backlog",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:30:28.044Z"
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

3. GET   `/tasks/:id`

    `Show data tasks by id`
* **URL**

  `/tasks/:id`

* **Method:**
  
   `GET`

* **Data Headers**
    ```
    Content-Type : app.json,
    access_token : access_token
    
    ```
* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`


* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "backlog",
      
    }
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

4. PUT `/tasks/:id`

    `Update All data todo by id`
* **URL**

  `/tasks/:id`

* **Method:**
  
   `PUT`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    title, 
    description, 
  ```

  Request Body
    ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "todo",
    }
    ```
 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "todo",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:31:28.044Z"
    }
  ```
 
* **Error Response:**

  get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

5. PATCH  `/tasks/id`

    `Update one data in todo by id`
* **URL**

  `/todos/:id`

* **Method:**
  
   `PATCH`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

* **Data Body**

  * **Endpoint ini akan menerima request body:**

    `category`

  Request Body
    ```JSON
    {
      "status" : "backlog", 
    }
    ```
 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "todo",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:31:28.044Z"
    }
  ```
 
* **Error Response:**

  get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />


6. DELETE  `/tasks/:id`

    `DELETE data tasks by id`
* **URL**

  `/tasks/:id`

* **Method:**
  
   `DELETE`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "message" : "tasks success delete"
    }
  ```
 

* **Error Response:**


  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

User

7. Post `/login`
* **Method:**
  
   `Post`


* **Data Body**

  ```
    email, 
    password, 
   , 
    
  ```
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "id" : 1,
      "email" : "test@mail.com",
      "password": "abc",
      "username": "test"
      
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

8. Post `/register`
* **Method:**
  
   `Post`


* **Data Body**

  ```
    email, 
    password, 
    username, 
    
  ```
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "id" : 1,
      "email" : "test@mail.com",
      "password": "abc",
      "username": "test"
      
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

7. Post `/google-login`
* **Method:**
  
   `Post`


* **Data Body**

  ```
    google_token, 
   , 
    
  ```
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "id" : 1,
      "email" : "test@mail.com",
      "password": "abc",
      "username": "test"
      
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />
