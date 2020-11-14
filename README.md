# kanban-app

**Register**
----

    Register New User

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  {
      name: "rivari22",
      email: "rivari22@gmail.com",
      password: "rivari22"
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      name: "rivari22",
      email: "rivari22@gmail.com"
  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Email must be Unique & type must be an email" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Password minimum has 6 words" }`


**Login**
----

    Login User

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  {
      email: "rivari22@gmail.com",
      password: "rivari22"
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{access_token}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Email Invalid or Password Invalid" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Email Invalid or Password Invalid" }`


**GET ALL TASK**
----

    Get all Task after login


* **URL**

  /tasks

* **Method:**

  `GET`

* **Headers:**

  `{ access_token }`
  
*  **URL Params**

   **Required:**
 
*Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "title": "coding",
        "CategoryId": 2,
        "createdAt": "2020-11-03T09:30:09.133Z",
        "updatedAt": "2020-11-03T09:30:09.133Z",
        "Category": {
            "id": 2,
            "name": "Work in Progress",
            "createdAt": "2020-11-03T09:30:09.122Z",
            "updatedAt": "2020-11-03T09:30:09.122Z"
        }
    }
    ]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Cannot get /tasks/" }`



**Add Task**
----

    Add Task List after login

* **URL**

    /tasks

* **Method:**

  `POST`

* **Headers:**

  `{ access_token }`
  
*  **URL Params**

   **Required:**
 
*Data Params**

    { 
        "title": "bikin server",
        "CategoryId": 2
    }


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 6,
    "title": "bikin server",
    "CategoryId": 2,
    "updatedAt": "2020-11-03T09:42:05.042Z",
    "createdAt": "2020-11-03T09:42:05.042Z"
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`


**Edit Task**
----

    Edit Task after login

* **URL**

  /tasks/:id

* **Method:**

  `PUT`

* **Headers:**

  `{ access_token }`
  
*  **URL Params**

   **Required:**
 
  `idd=[integer]`

* **Data Params**

    { 
        title: "Coding",
    }

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ 
        id: 1,
        title: "Coding",
        CategoryId: 1,
        "updatedAt": "2020-11-03T09:42:05.042Z",
        "createdAt": "2020-11-03T09:42:05.042Z"
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`


**Delete Task**
----

    Delete Task after login

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`

* **Headers:**

  `{ access_token }`
  
*  **URL Params**

   **Required:**
 
  `id=[integer]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ msg: "Successfully delete task with id = 1" }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`


**Update Status**
----

    Update status Task

* **URL**

  /tasks/:id

* **Method:**
  
  `PATCH`

* **Headers:**

  `{ access_token }`
  
*  **URL Params**

   **Required:**
 
  `id=[integer]`

* **Data Params**

    `{ CategoryId : 1 }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: "Success update status to 1" }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`


**Add Category**
----

    Add Category after login

* **URL**

    /category

* **Method:**

  `POST`
  
* **Headers:**

  `{ access_token }`

*  **URL Params**

   **Required:**
 
* **Data Params**

    { 
        "name": "Revisi"
    }


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 5,
    "name": "Revisi",
    "updatedAt": "2020-11-03T09:42:05.042Z",
    "createdAt": "2020-11-03T09:42:05.042Z"
    }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`