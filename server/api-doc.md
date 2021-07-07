# ** Kanban App **

## **ADD TASKS (CREATE)**

### **Menambahkan data Tasks.**

-   **URL**

		localhost:3000/tasks
		
- **Data Params**
	**Body:**

		{
			title : String,
			tag: String,
			CategoryId: String,
		}
 
-   **Method:** 
 
    `POST` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
    -   **Code:**  201 
        **Content:** 

		{
			title : String,
			tag: String,
			CategoryId: String,
		}

-   **Error Response:** 
 
    -   **Code:**  400 
        **Content:**
        
	        { error : "Validation Errors" }
 
     - **Code:**  500
        **Content:** 

			{ error : "Internal Server Error" }

---

## **SHOW TASKS (READ)**

### **Menampilkan data Tasks berupa JSON.**

-   **URL**

		localhost:3000/task
 
-   **Method:** 

    `GET` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
    -   **Code:**  200 
        **Content:**

			[
				{ id : integer }
			]

-   **Error Response:** 
 
    -   **Code:**  500 
        **Content:** 

			{ error : "Internal Server Error" }
 
 ---

## **SHOW CATEGORIES (READ)**

### **Menampilkan data Category berupa JSON.**

-   **URL**

		localhost:3000/catgory
 
-   **Method:** 

    `GET` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
    -   **Code:**  200 
        **Content:**

			[
				{ id : integer }
			]

-   **Error Response:** 
 
    -   **Code:**  500 
        **Content:** 

			{ error : "Internal Server Error" }
 
 ---


## **SHOW TASKS BY ID (READ)**

### **Menampilkan data Tasks berupa JSON berdasarkan ID.**

-   **URL**

		localhost:3000/tasks/:id
		
- **URL Params**

	**Required:**

		`id=[integer]`
 
-   **Method:** 
 
    `GET` 
 
-   **Success Response:**
	   Data yang di kembalikan : 

    -   **Code:**  200 
        **Content:** 

			{ todo }

-   **Error Response:** 

    -   **Code:**  404 
        **Content:**

			{ error : "Not Found" }
 
---
## **REPLACE TASKS (UPDATE)**

### **Merubah keseluruhan data Tasks.**

-   **URL**

		localhost:3000/tasks/:id

-   **Method:** 
 
    `PUT` 
		
 - **Data Params**
	**Body:**

		{
			title : String,
			tag: String,
		}
 
-   **Success Response:**
	   Data yang di kembalikan : 

    -   **Code:**  200 
        **Content:** 
         
	        {
				title : String,
				tag: String,
			}
 
-   **Error Response:** 
 
    -   **Code:**  404 
        **Content:**

			{ error : "Todo not found" }

      - **Code:**  400 
        **Content:** 

			{ error : "Validation Errors" }

       - **Code:**  500
        **Content:** 

			 { error : "Internal Server Errors" }

---
## **REPLACE SOME TASKS (UPDATE)**

### **Merubah sebagian data Tasks.**

-   **URL**

		localhost:3000/tasks/:id
		
-   **Method:** 
 
    `PATCH` 
		
 - **Data Params**
	**Body:**

		{
			CategoryId: ""
		}
 
 
 
-   **Success Response:**
	   Data yang di kembalikan : 
 
    -   **Code:**  200 
        **Content:** 
        
	        {
				title : String,
				tag: String,
			}
 
-   **Error Response:** 
 
    -   **Code:**  404 
        **Content:** 
        
			 { error : "Todo not found" }

      - **Code:**  400 
        **Content:** 

			{ error : "Validation Errors" }
       - **Code:**  500
        **Content:** 

			 { error : "Internal Server Errors" }

---
## **DELETE TASKS (DELETE)**

### **Menghapus data Tasks berdasarkan ID.**

-   **URL**

		localhost:3000/tasks/:id
		
- **Data Params**
	**Body:**

		{
			id: integer
		}
 
-   **Method:** 
 
    `DELETE` 
 
-   **Success Response:**
	   Data yang di kembalikan : 
 
    -   **Code:**  201 
        **Content:**

			{ message : 'tasks success to delete' }
 
-   **Error Response:** 
 
    -   **Code:**  404
        **Content:** 

			{ error : "Todo Not found" }
    
     - **Code:**  500
        **Content:** 

			{ error : "Internal Server Error" }
