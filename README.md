## kanban-app server
Membuat task list dan menampilkan task list yang telah dibuat

| method | routes | description |
|--------|--------|-------------|
| GET | /tasks | Menampilkan seluruh task list |
| POST | /tasks | Menambah task baru |
| PUT | /tasks/:id | Mengupdate task berdasarkan id |
| PATCH | /tasks/:id | Mengupdate category task berdasarkan id |
| DELETE | /tasks/:id | Menghapus task berdasarkan id |
| POST | /login | Login Menggunakan Email & Password |
| POST | /register | Register Menggunakan Email & Password |
| POST | /googleLogin | Login Menggunakan Google Account |


## POST /tasks
  Menambah task  baru

* **URL**

  /tasks

* **Method:**

  `POST`
  
*  **Data Params**
   
    **Request body:**
   ```javascript
   {
   "title" : "string",
   "description" : "string",
   "category" : "string",
   "UserId" : INT
   }
   ```
* **Header Params**

   `accessToken: 'eyJhbXXXXXXXX.ayaXXXX'`
      
* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
    `{
    "id": 20,
    "title": "Tes Post",
    "description": "Tes Tes lorem ipsum",
    "category": "backlog",
    "UserId": 2,
    "updatedAt": "2020-11-06T10:52:38.280Z",
    "createdAt": "2020-11-06T10:52:38.280Z"
    }`
   

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Description required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category required" }`

  OR

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          url : '/tasks',
          method : 'POST',
          data : {
            title,
            description,
            category
          },
          headers : {access_token}
        })
  ```

## GET /tasks
  Menampilkan seluruh tasks list beserta email user pembuat task

* **URL**

  /tasks

* **Method:**

  `GET`
        
* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
    [
    {
        "id": 2,
        "title": "Tes Post",
        "description": "Tes Tes",
        "category": "backlog",
        "UserId": 1,
        "createdAt": "2020-11-04T11:52:00.901Z",
        "updatedAt": "2020-11-06T08:05:18.421Z",
        "User": {
            "email": "coba@email.com"
        }
    },
    {
        "id": 3,
        "title": "Tes Post",
        "description": "Tes Tes",
        "category": "todo",
        "UserId": 1,
        "createdAt": "2020-11-04T15:20:19.250Z",
        "updatedAt": "2020-11-04T15:20:19.250Z",
        "User": {
            "email": "coba@email.com"
        }
    }
    ]
	 ```

	 
* **Error Response:**

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          method : 'get',
          url : '/tasks',
          headers : {access_token}
      })
  ```

## PUT /tasks/:id
Mengupdate tasks berdasarkan parameter id

* **URL**

  /tasks/:id

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Data Not Found" }` 


*  **Data Params**
   
    **Request body:**
   ```javascript
   {
   "title" : "string",
   "description" : "string",
   "category" : "string"
   }
   ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	{
    "id": 5,
    "title": "Coba Edit",
    "description": "Edit",
    "category": "doing",
    "UserId": 1,
    "createdAt": "2020-11-04T15:20:36.289Z",
    "updatedAt": "2020-11-06T05:45:56.846Z"
    }
	 ```

* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Title required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Description required" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category required" }`

  OR

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          url : `/tasks/:id`,
          method : 'PUT',
          data : {
            title,
            description,
            category
          },
          headers : {access_token}
        })
  ```


## PATCH /tasks/:id
  Mengupdate category task berdasarkan parameter id

* **URL**

  /tasks/:id

* **Method:**

  `PATCH`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Data Not Found" }` 

*  **Data Params**
   
    **Request body:**
   ```javascript
   {
   "category" : "string"
   }
   ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	{
        "id": 5,
        "title": "Coba Edit",
        "description": "Edit",
        "category": "done",
        "UserId": 1,
        "createdAt": "2020-11-04T15:20:36.289Z",
        "updatedAt": "2020-11-06T05:45:56.846Z"
    }
	 ```

* **Error Response:**
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Category required" }`

  OR

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
          url : `/tasks/:id`,
          method : 'PATCH',
          data : {
            category
          },
          headers : {access_token}
        })
  ```

## DELETE /tasks/:id
  Menghapus task list berdasarkan parameter id

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
        
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Data Not Found" }` 


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
	```javascript
	{
        "msg": "Task Deleted"
    }
	 ```

* **Error Response:**

  * **Code:** 403 FORBIDEN <br />
    **Content:** `{ msg : "You dont have access" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        url : `/tasks/:id`,
        method : 'DELETE',
        headers : {access_token}
    })
  ```

## **POST /login**
---
  Mengembalikan JSON access_token, id, dan email setelah berhasil login.

* **URL**

  /login

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzzkxkzxkzlxklzklxxxxxxxxxxxxxxxxxxxxxxx",
    "id": 2,
    "email": "coba@email.com"
}
    ```
 
* **Error Response:**

  * **Code:** 400 **FORBIDEN** <br />
    **Content:**`{ msg: "Email already exist"}`
  OR

  * **Code:** 400 **FORBIDEN** <br />
    **Content:**`{ msg: "Email must be example@email.com"}`
  OR

  * **Code:** 400 **FORBIDEN** <br />
    **Content:**`{ msg: "Email cannot be empty"}`
  OR

  * **Code:** 400 **FORBIDEN** <br />
    **Content:**`{ msg: "Password cannot be empty"}`
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        method: 'POST',
        url: '/login',
        data : {
            email,
            password
        }
    })
  ```

## POST /register**
---
  Mengembalikan data id beserta email berformat JSON setelah berhasil register.

* **URL**

  /register

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 201 **CREATED** <br />
    **Content:** 
    ```json
    {
    "id": 15,
    "email": "cobaaa@email.com"
    }
    ```

* **Error Response:**

  * **Code:** 400 **UNAUTHORIZED** <br />
    **Content:**`{ msg: "Invalid email or password"}`
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  register() {
      axios({
        method: "post",
        url: "/register",
        data: {
          email,
          password
        },
      })
  ```

  ## **POST /googleLogin**
---
  Mengembalikan JSON access_token, id, dan email setelah berhasil login dengan Google Account.

* **URL**

  /googleLogin

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 **OK** <br />
    **Content:** 
    ```json
    {
    "access_token": "eyJhbGciOiJIUzI1zxkzxkzxkxxxxxxxxxxxxxxxx",
    "id": 2,
    "email": "tesregister@gmail.com"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : "Internal Server Error." }`

* **Sample Call:**
  ```js
  axios({
        method: 'POST',
        url: '/googleLogin',
        data : {
            google_token
        }
    })