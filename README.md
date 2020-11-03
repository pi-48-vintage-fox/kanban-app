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
----
USER ROUTES
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