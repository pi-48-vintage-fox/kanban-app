## **KANBAN APP**
----

**Get Tasks**
----
  Menampilkan semua task yang telah dibuat.

* **URL**

  /tasks

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 </br>
    **Content:** `[{ id : "", title : "" , description: "", category: ""}]`
 
* **Error Response:**

  * **Code:** 500 </br>
    **Content:** `{ error : "Internal Server Error" }`
    

**Add Tasks**
----
  Menambahkan task baru.

* **URL**

  /tasks

* **Method:**

  `POST`
  
 * **Data Body:**
 
	* **Required:** `{ title:String, description: String, category: String }`

* **Success Response:**

  * **Code:** 201 </br>
    **Content:** `[{ id : "", title : "" , description: "", category: ""}]`
 
* **Error Response:**

  * **Code:** 400 </br>
    **Content:** `{ error : "Validation Error" }`
   
   * **Code:** 500 </br>
    **Content:** `{ error : "Internal Server Error" }`


**Put Tasks**
----
  Mengedit task berdasarkan id yang diinput.

* **URL**

  /tasks/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
   `id=[integer]`
   
 * **Data Body:**

	* **Required:** `{ title:String, description: String, category: String }`

* **Success Response:**

  * **Code:** 200 </br>
    **Content:** `[{ id : "", title : "" , description: "", category: ""}]`
 
* **Error Response:**

  * **Code:** 400 </br>
    **Content:** `{ error : "Validation Error" }`
    
   * **Code:** 404 </br>
    **Content:** `{ error : "Task is not found" }`
    
   * **Code:** 500 </br>
    **Content:** `{ error : "Internal Server Error" }`


**Patch Tasks**
----
  Mengubah category task dari id yang diinput.

* **URL**

  /tasks/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 </br>
    **Content:** `[{ id : "", title : "" , description: "", category: ""}]`
 
* **Error Response:**

  * **Code:** 400 </br>
    **Content:** `{ error : "Validation Error" }`
    
   * **Code:** 404 </br>
    **Content:** `{ error : "Task is not found" }`
    
   * **Code:** 500 </br>
    **Content:** `{ error : "Internal Server Error" }`


**Delete Tasks**
----
  Menghapus task berdasarkan id yang diinput.

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
   `id=[integer]`
  
* **Success Response:**

  * **Code:** 200 </br>
    **Content:** `{ message: 'Task successfully deleted!' }`
 
* **Error Response:**

   * **Code:** 404 </br>
    **Content:** `{ error : "Task is not found" }`
    
   * **Code:** 500 </br>
    **Content:** `{ error : "Internal Server Error" }`