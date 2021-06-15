# E-COMMERCE

### Register user

Return json new user in e-commerce

* URL
		
	/register
		
* Method
	
	Post

* URL Params

	None

* Request Body

	username:string
	email:string
	password:string

* Success Response:

		* Code: 201
			Content:

			{
				"id": ".....",

				"username": ".....",

				"email": "......",

				"role": "......",

				"updatedAt": ".......",

				"createdAt": "......"
			}

* Error Response:

		* Code: 400
			Content:

			based on validation error sequelize:

			{

				"message": [

					"username must be required",

					"email must be required",

					"password must be required",

					"input must be format email",

					"password length should be minimum 6 characters"

				]

			}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "Internal Server Error"

				}
---
### Login User Admin

Return json user token

* URL
		
	/loginAdmin
		
* Method
	
	Post

* URL Params

	None

* Request Body

	email:string
	password:string

* Success Response:

		* Code: 200
			Content:

			{
				"id": ".....",

				"email": "......",

				"access_token": "......"

			}

* Error Response:

		* Code: 400
			Content:

			{

				"message": "invalid Password or email"
				
			}
		
		* Code: 400
			Content:

			{

				"message": "invalid Password"
				
			}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Login User Customer

Return json user token

* URL
		
	/login
		
* Method
	
	POST

* URL Params

	None

* Request Body

	email:string
	password:string

* Success Response:

		* Code: 200
			Content:

			{
				"id": ".....",

				"email": "......",

				"access_token": "......"

			}

* Error Response:

		* Code: 400
			Content:

			{

				"message": "invalid Password or email"
				
			}
		
		* Code: 400
			Content:

			{

				"message": "invalid Password"
				
			}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
## E-COMMERCE CMS
### Create Product

Return json new data product

* URL
		
	/products
		
* Method
	
	POST

* URL Params

	None

* Headers
	
	access_token

* Request Body

	name:string
	image_url:string
	price:integer
	stock:integer

* Success Response:

		* Code: 201
			Content:

				{

					"id": ".....",

					"name": ".....",

					"image_url": ".....",

					"price": ".....",

					"stock": ".....",

					"updatedAt "......",

					"createdAt"......."

				}	
								
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"product name must be required",

							"image_url must be required",

							"price must be required",

							"stock must be required",

							"price can't be negative number",

							"stock can't be negative number",

							"stock must be format number"
						]

					}
				
		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Show Products

Return json data products

* URL
		
	/products
		
* Method
	
	GET

* URL Params

	node

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:
					[
						{

							"id": "....",

							"name": "....",

							"image_url": "....",

							"price": "....",

							"stock": "....",

							"createdAt": "....",

							"updatedAt": "...."

						}
					]
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}


		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Show Product By Id

Return json data product based on id

* URL
		
	/products/:id
		
* Method
	
	GET

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:

					{

						"id": "....",

						"name": "....",

						"image_url": "....",

						"price": "....",

						"stock": "....",

						"createdAt": "....",

						"updatedAt": "...."

					}
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Update Product By Id

Return json data product updated based on Id

* URL
		
	/products/:id
		
* Method
	
	PUT

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	name:string
	image_url:string
	price:integer
	stock:integer

* Success Response:

		* Code: 200
			Content:

					{

						"id": "....",

						"name": "....",

						"image_url": "....",

						"price": "....",

						"stock": "....",

						"createdAt": "....",

						"updatedAt": "...."

					}
					
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"product name must be required",

							"image_url must be required",

							"price must be required",

							"stock must be required",

							"price can't be negative number",

							"stock can't be negative number",

							"stock must be format number"
						]

					}

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Delete Product By Id

Return json information delete
* URL
		
	/products/:id
		
* Method
	
	DELETE

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	None
	
* Success Response:

		* Code: 200
			Content:

					{

						message : 'product success deleted'
						
					}
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Show Categories

Return json data categories

* URL
		
	/categories
		
* Method
	
	GET

* URL Params

	node

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:
					[
						{

							"id": "....",

							"name": "....",

							"Products": {

								"id": "....",

								"name": "....",

								"image_url": "....",

								"price": "....",

								"stock": "....",

								"createdAt": "....",

								"updatedAt": "...."

							},

							"createdAt": "....",

							"updatedAt": "...."

						}
					]
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}


		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
### Create Banner

Return json new data banner

* URL
		
	/banners
		
* Method
	
	POST

* URL Params

	None

* Headers
	
	access_token

* Request Body

	title:string
	image_url:string
	status:string

* Success Response:

		* Code: 201
			Content:

				{

					"id": ".....",

					"title": ".....",

					"image_url": ".....",

					"status": ".....",

					"updatedAt "......",

					"createdAt"......."

				}	
								
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"title name must be required",

							"image_url must be required",

							"status must be required",
						]

					}
				
		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Show Banners

Return json data banners

* URL
		
	/banners
		
* Method
	
	GET

* URL Params

	node

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:
					[
						{

							"id": "....",

							"title": "....",

							"image_url": "....",

							"status": "....",

							"createdAt": "....",

							"updatedAt": "...."

						}
					]
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}


		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
### Show Banner By Id

Return json data banner based on id

* URL
		
	/banners/:id
		
* Method
	
	GET

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:

					{

						"id": "....",

						"title": "....",

						"image_url": "....",

						"status": "....",

						"createdAt": "....",

						"updatedAt": "...."

					}
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Update Banner By Id

Return json data banner updated based on Id

* URL
		
	/banners/:id
		
* Method
	
	PUT

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	title:string
	image_url:string
	status:string

* Success Response:

		* Code: 200
			Content:

					{

						"id": "....",

						"title": "....",

						"image_url": "....",

						"status": "....",

						"createdAt": "....",

						"updatedAt": "...."

					}
					
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"title must be required",

							"image_url must be required",

							"status must be required"
						]

					}

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Delete Banner By Id

Return json information delete
* URL
		
	/banners/:id
		
* Method
	
	DELETE

* URL Params

	id=[integer]

* Headers
	
	access_token

* Request Body

	None
	
* Success Response:

		* Code: 200
			Content:

					{

						message : 'banner success deleted'
						
					}
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 404
			Content:

				{

					"message": "error not found"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---

## E-COMMERCE CUSTOMER
### Create Cart

Return json new data cart

* URL
		
	/carts
		
* Method
	
	POST

* URL Params

	None

* Headers
	
	access_token

* Request Body

	ProductId:integer

* Success Response:

		* Code: 201
			Content:

				{

					"id": ".....",

					"UserId": ".....",

					"status": "unpaid",

					"updatedAt "......",

					"createdAt"......."

				}	
								
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"status must be required",

						]

					}
				
		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Show Carts By User Id

Return json data carts based on UserId

* URL
		
	/carts
		
* Method
	
	GET

* URL Params

	node

* Headers
	
	access_token

* Request Body

	None

* Success Response:

		* Code: 200
			Content:
					[
						{

							"id": "....",

							"UserId": "....",

							"status": "....",

							"stock": "....",

							"createdAt": "....",

							"updatedAt": "....",

							"Products: [

								{
									"id": "....",

									"name": "....",

									"image_url": "....",

									"price": "....",

									"stock": "....",

									"createdAt": "....",

									"updatedAt": "....",

									"CartProduct": {

											"CartId": "....",

											"ProductId": "....",

											"quantity": "....",

											"createdAt": "....",

											"updatedAt": "....",

										}
									}
								}
							]
						}
					]
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}

		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}

---
### Update Cart By UserId

Return json data cart updated based on UserId

* URL
		
	/carts
		
* Method
	
	PATCH

* URL Params

	none

* Headers
	
	access_token

* Request Body

	none

* Success Response:

		* Code: 200
			Content:

					{

						"id": ".....",

						"UserId": ".....",

						"status": "paid",

						"updatedAt "......",

						"createdAt"......."

					}
					
* Error Response:

		* Code: 400
			Content:

				based on validation error sequelize:

					{

					"message": [

							"status must be required",

						]

					}

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}


		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}
---
### Delete Cart By UserId

Return json information delete
* URL
		
	/carts
		
* Method
	
	DELETE

* URL Params

	none

* Headers
	
	access_token

* Request Body

	None
	
* Success Response:

		* Code: 200
			Content:

					{

						message : 'cart success deleted'
						
					}
					
* Error Response:

		* Code: 401
			Content:

				{

					"message": "unauthorized"
					
				}


		* Code: 500
			Content:

				{

					"message": based on error sequelize message || "internal Server Error"

				}









