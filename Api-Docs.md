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
        **Content:**  `{ error : "Internal Server Error" }`
        
## **Replace TODOs**

Replace specific TODO item with new data

-   **URL**

		/todos/:id
-   **Method:**   
    
    	PUT
	
- **Header**

		"Authorization" : "Bearer ACCESS_TOKEN"		
 - **Data Params**
	
	**Body:**

		{
			title : "Edited Title",
			descriptions: "Edited Descriptions",
			status: "Done",
			due_date: "2020-11-2"
		}
   
 
   
-   **Success Response:**
	   Returned data : Todo item    
    -   **Code:**  200  
        **Content:**  
				
				{
					id: "4"
					title : "Edited Title",
					descriptions: "Edited Descriptions",
					status: "Done",
					due_date: "2020-11-2"
				}
    
-   **Error Response:**   
    
    -   **Code:**  404 
        **Content:**  `{ error : "Todo not found" }`
      - **Code:**  400 
        **Content:**  `{ error : "Validation Errors" }`
       - **Code:**  500
          **Content:**  `{ error : "Internal Server Errors" }`

## **Update TODOs**

Replace specific TODO item with new data

-   **URL**

		/todos/:id
	
-   **Method:**   
    
    	`PATCH`   

- **Header**

		"Authorization" : "Bearer ACCESS_TOKEN"		

 - **Data Params**

	**Body:**

		{
			status: "Done"
		}
   
-   **Success Response:**
	   Returned data : Todo item    
    -   **Code:**  200  
        **Content:**  
		
			{
				id : 4
				title : "Buy groceries",
				descriptions: "Sugar , coffee ,tea",
				status: "Done",
				due_date: "2020-11-1"
			}
    
-   **Error Response:**   
    
    -   **Code:**  404 
        **Content:**  `{ error : "Todo not found" }`
      - **Code:**  400 
        **Content:**  `{ error : "Validation Errors" }`
       - **Code:**  500
          **Content:**  `{ error : "Internal Server Errors" }`


 ## **DELETE  TODO**

Delete todo by id

-   **URL**

		/todos/:id
-   **Method:**   
    
    	DELETE
    
- **Header**

		"Authorization" : "Bearer ACCESS_TOKEN"		
- **Data Params**

	**Body:**
	
		{
			id: Number
		}

-   **Success Response:**
	   Returned data : Todo item    
    -   **Code:**  201  
        **Content:**  `{ message : 'todo success to delete' }` 
-   **Error Response:**   
    
    -   **Code:**  404
        **Content:**  `{ error : "Todo Not found" }`
    
     - **Code:**  500
        **Content:**  `{ error : "Internal Server Error" }`

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
        **Content:**  `{ error : "Internal Server Error" }`

 ## ** Weather API **

Oauth handler

-   **URL**

		/api/weather/:city

-   **Method:**   
    
    	GET
   
- **Header**

  ```
  "Authorization" : "Bearer ACCESS_TOKEN"
  ```

  **URL Params**

  city=jakarta

- **Success Response:**
     Returned data : Weather Data  
  -   **Code:**  200
      **Content:**  
  			
  	
  			{
  				"coord": {
  					"lon": 108.56,
  					"lat": -6.71
  				},
  				"weather": [
  					{
  						"id": 802,
  						"main": "Clouds",
  						"description": "scattered clouds",
  						"icon": "03d"
  					}
  				],
  				"base": "stations",
  				"main": {
  					"temp": 299.48,
  					"feels_like": 303.51,
  					"temp_min": 299.48,
  					"temp_max": 299.48,
  					"pressure": 1011,
  					"humidity": 77,
  					"sea_level": 1011,
  					"grnd_level": 1011
  				},
  				"visibility": 10000,
  				"wind": {
  					"speed": 0.93,
  					"deg": 108
  				},
  				"clouds": {
  					"all": 26
  				},
  				"dt": 1604192952,
  				"sys": {
  					"country": "ID",
  					"sunrise": 1604182732,
  					"sunset": 1604227182
  				},
  				"timezone": 25200,
  				"id": 1646170,
  				"name": "Cirebon",
  				"cod": 200
  			}

- **Error Response:**   

   - **Code:**  500
      **Content:**  `{ error : "Internal Server Error" }`