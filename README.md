# Storefront Backend Project

## To run app
1.) Create a .env file and save in the root directory of the project
Must have the follow values
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
SALT_ROUNDS=10
BCRYPT_PASSWORD=json-web-token-secret
TOKEN_SECRET=jwt-secret
POSTGRES_TEST_DB=store_front_test

2.) Database setup
a.) Ensure postgres is running on your local computer (via homebrew etc: brew services start postgres)
a.) create postgres user if it does not already exist: createuser --superuser postgres
b.) login to postgres: psql -d postgres -U postgres -p 5432 -h localhost
c.) run the following commands to create needed databases:
CREATE DATABASE store_front
CREATE DATABASE store_front_test


2.) Run Install: npm install

3.) Run DB Migrations: db-migrate up

4.) Start server: npm run start


## Running Ports
After start up, the server will start on port 3000 and the database on port 5432.

## To run tests
Ensure you have 2 database created the following
1.) npm run test


## To run tests
Ensure you have 2 database created the following
1.) npm run test


