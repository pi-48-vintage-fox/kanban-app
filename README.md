# kanban-app

**DESCRIPTION**
----
  A very genuine kanban app used to store what to do to reminds an instance or organization. To use the app, simply register or login with google, 
  then join into organization that would not mind to accept you by adding you through postman and so (USE "/relations" OR READ LINE 125). After you got yourself registered into an Organization, you will simply be able to see every tasks in every categories stored or created by the organization members itself. And of course manage to edit, delete, or move.


**REGISTER USER**
----
  Register user account

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        id,
        email
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]


**LOGIN USER**
----
  Login into user account

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        id,
        email
    }
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'Wrong email/password'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GOOGLE LOGIN USER**
----
  Login into user google account

* **URL**

  /googleLogin

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `google_access_token=[(access_token from google)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        token
    }
 
* **Error Response:**

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD RELATION**
----
  Add relation between user and organization

* **URL**

  /relations

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `organization_id=[integer]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** 

   `User with id [(user.id)] has joined the organization with id [(organization.id)]`
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD TASK**
----
  Add task to a specify category on a specify organization

* **URL**

  /tasks

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `title=[string]`
   `category=[string]`
   `OrganizationId=[integer]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        title,
        category,
        OrganizationId,
        UserId
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**EDIT TASK**
----
  Edit task in a specify category in a specify organization

* **URL**

  /tasks

* **Method:**

  `PUT`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `title=[string]`
   `category=[string]`
   `OrganizationId=[integer]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        title,
        category,
        OrganizationId,
        UserId
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**MOVE TASK**
----
  Move task to a specify category in a specify organization

* **URL**

  /tasks

* **Method:**

  `PATCH`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `category=[string]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** { 
        title,
        category,
        OrganizationId,
        UserId
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**DELETE TASK**
----
  Delete task in a specify category in a specify organization

* **URL**

  /tasks

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `id=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `Delete task successful`
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET TASKS**
----
  Get all tasks of a specify organization

* **URL**

  /tasks

* **Method:**

  `GET`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      { 
        title,
        category,
        OrganizationId,
        UserId
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**CREATE ORGANIZATION**
----
  Create organization

* **URL**

  /organizations

* **Method:**

  `POST`

* **Data Params**

  **Required:**
 
   `name=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        name
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET ALL ORGANIZATIONS**
----
  Get all organizations

* **URL**

  /organizations

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      { 
        title
      }
    ]
 
* **Error Response:**

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET ALL CATEGORIES**
----
  Get all Categories of an Organization

* **URL**

  /categories

* **Method:**

  `GET`

* **URL Params**

  **Required:**
 
  `orgId=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** [
      { 
        name,
        OrganizationId
      }
    ]
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**ADD CATEGORY**
----
  Add category on a specify organization

* **URL**

  /categories

* **Method:**

  `POST`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Data Params**

  **Required:**
 
   `name=[string]`

* **Success Response:**

  * **Code:** 201 (Created) <br />
    **Content:** { 
        name
    }
 
* **Error Response:**

  * **Code:** 400 (Bad request) <br />
    **Content:** [
        {
            message: <content.key> required
        }
    ]

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]


**GET ALL CATEGORIES**
----
  Delete a Category from an Organization

* **URL**

  /categories

* **Method:**

  `DELETE`

* **URL Params**

  **Required:**
 
  `Id=[integer]`
  `orgId=[integer]`

* **Headers**

  **Required**

  `token=[(access_token from login)]`

* **Success Response:**

  * **Code:** 200 (Ok) <br />
    **Content:** 

    `Delete category successful`
 
* **Error Response:**

  * **Code:** 401 (Unauthorized) <br />
    **Content:** [
        {
            message: 'User Unauthorized'
        }
    ]

  * **Code:** 500 (Internal server error) <br />
    **Content:** [
        {
            message: Internal Server Error
        }
    ]