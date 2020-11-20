# kanban-app

*Register*
--

  

Register an user

  

*  *URL*

  

            /register

  

*  *Method*

  

            POST

  

*  *Data Params*



            {
                  email: bimo@mail.com,
                  password: bimo
            }


  

*  *Success Response:*

  

*  *Code:* 201 (CREATED)

  

*Content:*



            { 
                  email: bimo@mail.com,
                  password: bimo
            }



  

  

*  *Error Response:*

  

*  *Code:* 400 (Bad request)

  

*  *Content:*  `{ error : "Validation Errors" }`

  

*  *Code:* 500 (Internal Server Error )

<br>
<br>

*Login*
--

Login user

  

*  *URL*

  

            /login

*  *Method*

  

            POST

  

*  *Data Params*



            {
                  email: bimo@mail.com,
                  password: bimo123
            }



*  *Success Response:*

  

*  *Code:* 200(OK)

*Content:*


            {
                  id: 1,
                  email: bimo@mail.com
            }


  
  

*  *Error Response:*

  

*  *Code:* 401(Unauthorized)

  

*  *Content:*  `{ error : "Email or Password wrong" }`

  

*  *Code:* 500 (Internal Server Error )

<br>
<br>  
  

*Add Task*
--

  

Add a kanban task list

  

*  *URL*

  

            /tasks

  

  

*  *Method*

  

            POST

  

*  *Header*

            access_token: <string>

  
  

*  *Data Params*

  


            {   
                  title : "<add title>",
                  description: "<add description>",
            }


  

*  *Success Response:*

  

*  *Code:* 201 (CREATED)

  

*Content:*


            {
                  id : "id"
                  title : kanban title",
                  description : "kanban description",  
            }  

 




  

*  *Error Response:*

  

*  *Code:* 400 (Bad request)

  

*  *Content:*  `{ error : "Validation Errors" }`

  

*  *Code:* 500 (Internal Server Error )

<br>
<br>

  

*Show All Tasks*
--

  

Show all task list data

  

  

*  *URL*

  

            /tasks

  

  

*  *Method*

  

            GET

  

*  *Header*

            access_token: <string>

  

*  *Success Response:*

  

*  *Code:* 200 (OK)

  

*Content:*


      [
            {
                  id : "<kanban id>"
                  title : "<kanban description>",
                  description : "<kanban description>",
            },
            { 
                  id : "<kanban id>"
                  title : "<kanban description>",
                  description : "<kanban description>"
            
            },
      ]


  

*  *Error Response:*

  

*  *Code:* 500 (Internal Server Error )

<br>
<br>
  

*Edit Task*
--

  

Edit a task list

  

* *URL*

  


      /tasks/:id


  

  

* *Method:*

  

  

      `PUT`

  

* *Header*

`access_token: string`

  

* *URL Params*

      /tasks/:id



* *Required:*

  


      id=[integer]


*Data Params*

  


      { 
            title : "<edit Kanban title>",
            description: "<edit Kanban description>",	
      }


  

  

- *Success Response:*

  

- *Code:* 200(OK)

  

*Content:*

  


      { 
          title : "Kanban Title",
          description: "Kanban description"
      }


  

* *Error Response:*

  

* *Code:* 400 (Bad request)

  

* *Content:* `{ error : "Validation Errors" }`

  

* *Code:* 404 (Not Found)

  

* *Content:* `{ error : "Not Found" }`

  

* *Code:* 500 (Internal server error)

<br>
<br>  
  

*Update Task*
--


Update Task List


* *URL*


      /tasks/:id


  
* *Method:*

      PATCH

* *Header*

      access_token: string

  
  

* *URL Params*


/tasks/:id


* *Required:*

      id=[integer]


*Data Params*


      { 
          title : "<Kanban title>",
          description: "<Kanban description>",
          category: "<Kanban category>"
      }


  

  

* *Success Response:*

  

* *Code:* 200

* *Content:*

  


      { 
          title : "<Kanban title>",
          description: "<Kanban description>",
          tag: "<Updated kanban category>"
      }


  

* *Error Response:*

  

* *Code:* 400 (Bad request)

  

* *Content:* `{ error : "Validation Errors" }`

  

* *Code:* 404 (Not Found)

  

* *Content:* `{ error : "Not Found" }`

  

* *Code:* 500 (Internal server error)

  

  

*Delete Task*
--

Delete Task list

  

* *URL*

      /tasks/:id


* *Method:*

      DELETE

* *Header*

      access_token: string

  

* *URL Params*

      tasks/:id


* *Required:*

      id=[integer]



* *Data Params*

  

      { 
          id : "<deleted id>",
      }


  

  

* *Success Response:*

  

* *Code:* 200(OK)

  

*Content:*

  

`Task was successfully deleted`

  

* *Error Response:*

  

* *Code:* 404 (Not Found)

  

*Content:* `{ error : "Not found" }`

  

* *Code:* 500 (Internal Server Error )