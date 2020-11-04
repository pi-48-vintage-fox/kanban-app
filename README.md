**kanban-app**
----
USER ROUTES
--------------------------
* **URL**

  `/user/register`

* **Description** <br />
`REGISTER USER`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |name       |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
    |password   |string|REQUIRED    |-
    |profilePicture   |string  |   |

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 201 Created <br />
    **Content:** <br />
    ```javascript
    {
        "msg": "User succesfully created"
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
* **URL**

  `/user/login`

* **Description** <br />
`LOGIN USER`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |name       |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "access_token": string,
        "name": string
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/user/googleLogin`

* **Description** <br />
`LOGIN USER VIA GOOGLE ACCOUNT`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |name       |string|REQUIRED    |-
    |email      |string|REQUIRED    |unique
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
        "access_token": string,
        "name": string,
        "profilePicture": string

    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
TASK ROUTES
--------------------------
* **URL**

  `/task`

* **Description** <br />
`CREATE POSTING`

* **Method:**
  
  `POST`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

  `request body`

    | Key       | Type | Description|Validation|
    |-----------|------|------------|----------|
    |title      |string|            |REQUIRED
    |category   |string|            |REQUIRED
   

* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      "id": integer,
      "title": string,
      "category": string,
      "UserId": integer,
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/task`

* **Description** <br />
`FETCH POSTING`

* **Method:**
  
  `GET`

* **Headers:**
  
  `access_token=string`
*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
    `none`
* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      "id": integer,
      "title": string,
      "category": string,
      "UserId": integer,
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/task/category/:id`

* **Description** <br />
`PATCH POSTING CATEGORY`

* **Method:**
  
  `PATCH`

* **Headers:**
  `access_token=string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
    `none`
* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      "id": integer,
      "title": string,
      "category": string,
      "UserId": integer,
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/task/title/:id`

* **Description** <br />
`PATCH POSTING title`

* **Method:**
  
  `PATCH`

* **Headers:**
  `access_token=string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
    `none`
* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      "id": integer,
      "title": string,
      "category": string,
      "UserId": integer,
      "updatedAt": "timestamp",
      "createdAt": "timestamp"
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------
--------------------------
* **URL**

  `/task/title/:id`

* **Description** <br />
`DELETE POSTING`

* **Method:**
  
  `DELETE`

* **Headers:**
  `access_token=string`

*  **URL Params**

   `none`

   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**
    `none`
* **Success Response:**<br />
    `IF PAYLOAD SUITS VALIDATION RULE`
  * **Code:** 200 OK <br />
    **Content:** <br />
    ```javascript
    {
      `Task sucessfully deleted`
    }
    ```
 
* **Error Response:**

  `IF VALIDATION FAILS`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "VALIDATION FAILS" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    

* **Sample Call:**

  `none`

* **Notes:**

  `none`
--------------------------