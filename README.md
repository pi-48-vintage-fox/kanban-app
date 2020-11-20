# Kanban App

  

**Register**
--

  

Register an user

  

*  **URL**

  

/user/register

  

*  **Method**

  

`POST`

  

*  **Data Params**

```
{
	email: reynaldi@gmail.com,

	password: coba123
}
```

  

*  **Success Response:**

  

*  **Code:** 201 (CREATED)

  

**Content:**

```

{
	email: reynaldi@gmail.com,

	password: coba123
}

```


*  **Error Response:**

  

*  **Code:** 400 (Bad request)

  

*  **Content:**  `{ error : "Validation Errors" }`

  

*  **Code:** 500 (Internal Server Error )

  
  

**Login**
--

Login user

*  **URL**

/user/login

*  **Method**


`POST`

*  **Data Params**

```

{
	email: reynaldi@gmail.com,

	password: coba123
}

```

*  **Success Response:**

  

*  **Code:** 200(OK)

**Content:**

`
{
id : 1
}
`
 

*  **Error Response:**

  

*  **Code:** 401(Unauthorized)

  

*  **Content:**  `{ error : "Email or Password wrong" }`

  

*  **Code:** 500 (Internal Server Error )

  
  

**Add Task**
--

  

Add a kanban task list


*  **URL**


/task



*  **Method**

  

`POST`

  

*  **Header**

`access_token: string`

  
  

*  **Data Params**

  

```
{ 
	title : "Kanban App",
	category: "backlog",
	tag: "program"
}
```

  

*  **Success Response:**

  

*  **Code:** 201 (CREATED)

  

**Content:**

  
```
{ 
	title : "Kanban App",
	category: "backlog",
	tag: "program"
}
```

  

*  **Error Response:**

  

*  **Code:** 400 (Bad request)

  

*  **Content:**  `{ error : "Validation Errors" }`

  

*  **Code:** 500 (Internal Server Error )



**Show All Tasks**
--

  

Show all task list data


*  **URL**

  

/task


*  **Method**

  

`GET`

  

*  **Header**

`access_token: string`

  

*  **Success Response:**

  

*  **Code:** 200 (OK)

  

**Content:**

```
[
	{ 
		title : "Kanban App",
		category: "Doing",
		tag: "program"
	},
	{ 
		title : "Vue kanban App",
		category: "backlog",
		tag: "program"
	},
]
```

  

*  **Error Response:**

  

*  **Code:** 500 (Internal Server Error )

  

**Find One Task**
--

Show a task list data

*  **URL**

/task/:id



*  **Method**

  

`GET`

  

*  **Header**

`access_token: string`

  

*  **URL Params**
```
/:id
```

*  **Required:**
```
id=[integer]
```


*  **Success Response:**

  

*  **Code:** 200 (OK)

  

**Content:**

  

```
{ 
		title : "Kanban App",
		category: "Doing",
		tag: "program"
}
```

  

*  **Error Response:**

  

**Code:** 404 (NOT FOUND)

  

**Content:** `{ error : "Cannot get /task/1" }`


  

**Edit Task**
-- 

Edit a task list


* **URL**


```
/task/:id
```


* **Method:**
`PUT`

* **Header**

`access_token: string`

  

* **URL Params**
```
/:id
```


* **Required:**

  

```
id=[integer]
```

**Data Params**

  

```
{ 
		title : "Kanban App",
		category: "Doing",
		tag: "program"
}
```

  

  

- **Success Response:**

  

- **Code:** 200(OK)

  

**Content:**

  

```
{ 
		title : "Kanban App Phase 2",
		category: "Doing",
		tag: "program"
}
```

  

* **Error Response:**

  

* **Code:** 400 (Bad request)

  

* **Content:** `{ error : "Validation Errors" }`

  

* **Code:** 404 (Not Found)

  

* **Content:** `{ error : "Not Found" }`

  

* **Code:** 500 (Internal server error)

  
  

**Update Task**
--


Update Task List


* **URL**

```
/task/:id
```

  
* **Method:**

`PATCH`

* **Header**

`access_token: string`

  
  

* **URL Params**

```
/:id
```

* **Required:**
```
id=[integer]
```

**Data Params**

```
{ 
		title : "Kanban App Phase 2",
		category: "Doing",
		tag: "program"
}
```

  

  

* **Success Response:**

  

* **Code:** 200

* **Content:**

  

```
{ 
		title : "Kanban App Phase 2",
		category: "Done",
		tag: "program"
}
```

  

* **Error Response:**

  

* **Code:** 400 (Bad request)

  

* **Content:** `{ error : "Validation Errors" }`

  

* **Code:** 404 (Not Found)

  

* **Content:** `{ error : "Not Found" }`

  

* **Code:** 500 (Internal server error)

  

  

**Delete Task**
--

Delete Task list

  

* **URL**
```
/task/:id
```

* **Method:**

`DELETE`

* **Header**

`access_token: string`

  

* **URL Params**
```
/:id
```

* **Required:**
```
id=[integer]
```


* **Data Params**

  

```
{
id : 1,
}
```

  

  

* **Success Response:**

  

* **Code:** 200(OK)

  

**Content:**

  

`Task was successfully deleted`

  

* **Error Response:**

  

* **Code:** 404 (Not Found)

  

**Content:** `{ error : "Not found" }`

  

* **Code:** 500 (Internal Server Error )