# **KANG BANG**

## Api Documentation



##### **Route lists**

| METHODS | URI                | DESCRIPTIONS                               | REQUEST BODY                                         |
| ------: | :----------------- | :----------------------------------------- | :--------------------------------------------------- |
|    POST | /login             | Sign in User                               | { email:**required** , password:**required** }       |
|    POST | /oauth             | Sign in using Oauth                        | *none*                                               |
|    POST | /register          | Sign Up User                               | { email:**required** , password:**required** }       |
|     GET | /tasks             | Get all Tasks list from database           | *none*                                               |
|    POST | /tasks             | Insert new Task to database                | { title:**required** , descriptions}                 |
|     PUT | /tasks/:id         | Update task with new title or descriptions | { title, descriptions}                               |
|   PATCH | /tasks/tags/:id    | Add tag to a task                          | { name:**required** , color }                        |
|   PATCH | /tasks/:id         | Add task to a category                     | { categoryId: **required** , taskId : **required **} |
|  DELETE | /tasks/:id         | Delete a task                              | { id:**required** }                                  |
|     GET | /organizations     | Get list of organization                   | *none*                                               |
|    POST | /organizations     | Add new organization                       | { name:**required** }                                |
|   PATCH | /organizations/:id | Update organization with new name          | { name: required }                                   |
|  DELETE | /organizations/:id | Delete Organization                        | { id:**required** }                                  |
|     GET | /categories        | Get list of categories                     | *none*                                               |
|    POST | /categories        | Add new Category                           | { name: **required** }                               |
|   PATCH | /categories/:id    | Change category title                      | { name: **required** }                               |
|  DELETE | /categories/:id    | Delete a Category                          | { id:**required** }                                  |
|    POST | /users/assign      | Assign an organization to user             | { organizationId: **required** }                     |



### Login

-   **URL**

		/login
    
-   **Method:**   
    
    ```
    POST	
    ```
    
-   ##### Request Body

    ```
    {
    	email : "test@email.com",
    	password: "secret"
    }
    ```

    

-   **Success Response:**
	
    -   **Code:**  200  
    	
	    -   **Content:** 
        	
    	    ```
            {
        		access_token : "access_token"
            }
            ```
    
- **Error Response:**   

  - Code: 400

    - Content:

      ```
      {
      	msg: "Wrong email/password"
      }
      ```

      

  - **Code:**  500 

    -   **Content:**  
        
        ```
        {
        	msg: "Internal Server Error"
        }
        ```
        
        

 ### **Register**

-   **URL**

		/register
	
-   ##### Method

    ```
    POST
    ```

-   ##### Request Body

    ```
    {
    	email: "test1@email.com",
    	password: "secret"
    }
    ```

    

-   ##### Success Response

    -   ##### Code : 200

        -   Content : 

            ```
            {
            	access_token : "access_token"
            } 
            ```

-   **Error Response:**
	
    -   ##### **Code:**  401 
        
        * Content: 
        
          ```
          {
          	msg: [
          		"Validation Message",
          		...
          	]
          }
          ```
        
          
        
    -   ##### Code : 500
    
        -   Content :
    
            ```
            {
            	msg: "Internal Server Error"
            }
            ```





Add data to TODO

-   **URL**

		/todos
	
- **Data Params**

	**Body:**
	
		{
			title : String,
			descriptions: String,
			status: String,
			due_date: Date
		}

-   **Method:**   
    
    `POST`    
    
-   **Success Response:**
	   Returned data : Todo item    
    -   **Code:**  201  
        **Content:**  ` {
			title : String,
			descriptions: String ,
			status: String,
			due_date: Date
		} ` 
-   **Error Response:**   
    
    -   **Code:**  400 
        **Content:**  `{ error : "Validation Errors" }`
    
     - **Code:**  500
        **Content:**  `{ error : "Internal Server Error" }
 ## ** Oauth SIGN IN**

Oauth handler

-   **URL**

		/user/oauth

-   **Method:**   
    
    	POST

- **Data Params**

	**Body:**
	
		{
			id: Number
		}

-   **Success Response:**
	   Returned data : Todo item    
    -   **Code:**  201  
        **Content:**  `{ message : 'Success' }` 
-   **Error Response:**   
     - **Code:**  500
        **Content:**  `{ error : "Internal Server Error" }
