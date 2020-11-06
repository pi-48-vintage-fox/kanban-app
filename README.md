**POST /task**
----
  Add to do list to server.

* **URL**

  /task

* **Method:**

  `POST`

* **URL Params**

   **Required:**
 

* **Data Params**

  `
  title:[string],
  category:[string]
  description:[string],
  status:[string]
  `

* **Header Params**
  access_token: xxxxxxxxxxxxxx

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** 
    `
    id,
    title,
    status,
    description
    `
 
* **Error Response:**

  * **Code:** 400 Validate due_date <br />
    **Content:** `{ error : "INVALID DATE" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

-------------------------------------------------------------------------------------

**GET /task**
----
  Menampilkan seluruh task

* **URL**

  /task

* **Method:**
  
  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id",
        "title",
        "description",
        "status",
        "due_date"
    }
]`
 
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error: Internal Server Error }`

---------------------------------------------------------------------------------

**PUT /task/:id**
----
  Mengedit seluruh kolom dalam sebuah tabel

* **URL**

  `/task/:id`

* **Method:**

  `PUT`
  
*  **URL Params**

  `/task/:id`

   **Required:**
 
   `id=[integer]`

*  **Data Params**

  `
  title:[string]
  category:[string]
  description:[string]
  `


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
    {
        "id",
        "title",
        "description",
        "description",
    }
  ]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST<br />
    **Content:** `{ message : "Title cannot be empty" }`

  OR

  * **Code:** 400 BAD REQUEST<br />
  **Content:** `{ message : "Category cannot be empty" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal server error" }`

------------------------------------------------------------------------------------------

**DELETE /delete/:id**
----
  Menghapus baris/sebuah task 

* **URL**

  /task/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**


* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{message: 'Success delete task'}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal server error" }`


------------------------------------------------------------------------------------------

**POST /login**
----
  Login ke halaman home kaban

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   /login

   **Required:**

* **Data Params**

  `
  email=[string]
  password=[string]
  `

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      {
        "access_token",
        "id",
        "email"
      }
    ]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Must be format email" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Email cannot be empty" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`



**POST /Register**
----
  Register akun kaban

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   /register

   **Required:**

* **Data Params**

  `
  email=[string]
  password=[string]
  `

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[
      {
        "id",
        "email"
      }
    ]`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Must be format email" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Email cannot be empty" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`