/* Replace with your SQL commands */

CREATE TABLE products (
    name VARCHAR(100), 
    price integer, 
    id SERIAL PRIMARY KEY
);

CREATE TABLE users (
    firstName VARCHAR(100), 
    lastName VARCHAR(100), 
    password VARCHAR(100), 
    username varchar(255),
    id SERIAL PRIMARY KEY
);


CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);


CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);