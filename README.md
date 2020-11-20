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
      email: "adrian@gmail.com",
      password: "adriian123"
  }

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      email: "adrian@gmail.com",
      password: "adriian123"
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
      email: "adrian@gmail.com",
      password: "adriian123"
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
                `{
                    access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlNhbXBsZSBCaW4gU2FtcGxlIiwiZW1haWwiOiJzYW1wbGVAZ21haWwuY29tIiwiaWF0IjoxNjA0NjcxNzQ4fQ.jXKC9tF1UF9AuR37K7HYN8myvqmBnuVd6TpwNZ7qzFc,
                    id: 2,
                    name: "Adrian Muhammad Kuncoro"
                }`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong email or password" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Wrong email or password" }`



**GET ALL TASKS USER**
----

    Get all tasks User after login


* **URL**

  /tasks

* **Method:**

  `GET`

*  **URL Params**

   **Required:**

*Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
        { 
            id : 1,
            title: "Main Dota",
            description: "push rank minimal sampai archon",
            category: "Backlog",
            UserId: 3
        }
    ]`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Cannot get /todo/1" }`



**Add TASKS**
----

    Add TASKS List after login

* **URL**

    /tasks

* **Method:**

  `POST`

*  **URL Params**

   **Required:**

*Data Params**

    { 
        id : 1,
        title: "Main Dota",
        description: "push rank minimal sampai archon",
        category: "Backlog",
        UserId: 3
    }


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `[
            { 
                id : 1,
                title: "Main Dota",
                description: "push rank minimal sampai archon",
                category: "Backlog",
                UserId: 3
            },
            { 
                id : 2,
                title: "Main Bola",
                description: "main ampe kaki pengkor",
                category: "Backlog",
                UserId: 3
            }
        ]`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`


**Edit TASKS**
----

    Edit TASKS after login

* **URL**

  /tasks/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

  `tasksId=[integer]`

* **Data Params**

    { 
        id : 2,
        title: "Main Bola",
        description: "main ampe kaki pengkor",
        category: "Backlog",
        UserId: 3
    }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ 
        id : 2,
        title: "Main Bola",
        description: "main ampe kaki pengkor",
        category: "Backlog",
        UserId: 3
    }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`


**Delete TASKS List**
----

    Delete TASKS after login

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**

  `taksId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Deleted success`

* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{ error : "Not Found" }`


**Update Category TASKS (move)**
----

    Update category TASKS

* **URL**

  /tasks/:id

* **Method:**

  `PATCH`

*  **URL Params**

   **Required:**

  `tasksId=[integer]`

* **Data Params**

    `{ category : products }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ msg: "Update success" }`

* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Server Internal Error" }`

