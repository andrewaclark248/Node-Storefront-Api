# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


## RESUTFUL ROUTES

#### Users
- CREATE - POST: /api/users REQUIRED PARAMS: { username: "", password: ""}
- INDEX - GET: /api/users REQUIRED PARAMS: Auth Token
- SHOW - GET: /api/users/:id REQUIRED PARAMS: Auth Token


#### Products
- CREATE - POST: /api/products REQUIRED PARAMS: { username: "", password: ""}, Auth Token
- INDEX - GET: /api/products
- SHOW - GET: /api/products/:id


#### Orders
- CREATE - POST: /api/order REQUIRED PARAMS: { products: [product_id: "", quantity: ""], status: true, user_id: "" }, Auth Token
- SHOW - GET: /api/products/:id REQUIRED PARAMS: Auth Token


## Database Schema
#### users
- id         SERIAL PRIMARY KEY
- firstName  VARCHAR(100)
- lastName   VARCHAR(100)
- password   VARCHAR(100)
- username   VARCHAR(255)

#### products
-  id        SERIAL PRIMARY KEY
- name       VARCHAR(100)
- price      integer

#### order
-  id        SERIAL PRIMARY KEY
- user_id    integer
- price      integer

#### order_products
- order_id   integer
- product_id integer
- quantity   integer

