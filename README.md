# kanban-app


## **Register User**

	Create user

-   **URL**
    
    /register
    
-   **Method:**
    
     `POST`  

   **Data Params**
    
    {
    name: String,
    email: String,
    password: String
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  201  **Content:**  `{access_token: "dfvyhvjoob4567g", name: "Hutamy Triesthi"}`
        
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
    

## **Login User**

    User log in

-   **URL**
    
    /login
    
-   **Method:**
    
    `POST`

   **Data Params**
    
    {
    email: String,
    password: String
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  201  **Content:**  `{access_token: "dfvyhvjoob4567g", name: "Hutamy Triesthi"}`
        
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Log In Google**

	Log in user from google account

-   **URL**
    
    /googleLogin

-   **Method:**
    
     `POST`  
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  201  **Content:**  `{access_token: "567hbnmu087"}`
        
-   **Error Response:**
   
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Show All Tasks**

    Show all tasks

-   **URL**
    
    /tasks

-   **Method:**
    
    `GET`
    
-   **Success Response:**
    
    -   **Code:**  200   **Content:**   `[{title: "Groceries Shopping", description: "get some chicken", CategoryID: 1, UserId: 2}] (array of objects)`
    
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Add Task**

    Add task to list

-   **URL**
    
    /tasks

    
-   **Method:**
    
    `POST`


   **Data Params**
    
    {
    title: String,
    description: String,
    CategoryId: Integer,
    UserId: Integer
    }
    
-   **Success Response:**
    
    -   **Code:**  201   **Content:**   `{title: "Groceries Shopping", description: "get some chicken", CategoryID: 1, UserId: 2}`
    
-   **Error Response:**
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`
    
        

## **Edit Task**

	Edit existing tasks with new data

-   **URL**
    
    /tasks/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PUT`  

**Data Params**
    
    {
    title: String,
    description: String,
    CategoryId: Integer,
    UserId: Integer
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  200  **Content:**  `{title: "Groceries Shopping", description: "get some chicken", CategoryID: 1, UserId: 2}`
        
-   **Error Response:**
    
    -   **Code:**  400  **Content:**  `{ error : "Validation Errors" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`

    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`

    
## **Update Task**

	Update existing tasks's category with new data

-   **URL**
    
    /tasks/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `PUT`  

**Data Params**
    
    {
    CategoryId: Integer,
    }
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  200  **Content:**  `{title: "Groceries Shopping", description: "get some chicken", CategoryID: 1, UserId: 2}`
        
-   **Error Response:**
    
    -   **Code:**  400  **Content:**  `{ error : "Validation Errors" }`

    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


## **Delete Task**

	Delete existing task

-   **URL**
    
    /tasks/:id

- **URL Params**

	**Required:**

		`id=[integer]`
    
-   **Method:**
    
     `DELETE`  
    
-   **Success Response:**
    
    Return data from Task list
    
    -   **Code:**  200  **Content:**  `{messsage: "Task success to delete"}`
        
-   **Error Response:**
    
    -   **Code:**  404  **Content:**  `{ error : "Not Found" }`
    -   **Code:**  500  **Content:**  `{ error : "Internal Server Error" }`


