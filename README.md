[![Coverage Status](https://coveralls.io/repos/github/joel-ace/mock-sms-api/badge.svg?branch=master)](https://coveralls.io/github/joel-ace/mock-sms-api?branch=master)
[![Build Status](https://travis-ci.org/joel-ace/mock-sms-api.svg?branch=master)](https://travis-ci.org/joel-ace/mock-sms-api)

## Mock-SMS API
A mock SMS Management API.

## API Documentation
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors. View full API documentation [here](https://#/)


## Technologies Used
- **[JavaScript ES6](http://es6-features.org/)** - Codes were written in javascript ES6.
- **[NodeJS](https://nodejs.org/)** - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
- **[ExpressJS](https://expressjs.com/)** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
- **[PostgreSQL](https://www.postgresql.org/)** - Postgres is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards compliance.
- **[Sequelize](http://docs.sequelizejs.com/)** - Sequelize is a promise-based ORM for Node.js which supports the dialects of PostgreSQL and features solid transaction support, relations, read replication and more.

## Installation
- Install [NodeJs](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/) on your machine
- Clone the repository `git clone https://github.com/joel-ace/mock-sms-api.git`
- Change into the directory `cd mock-sms-api`
- Install all required dependencies with `npm install`

## Set up Database
- run `psql postgres --u postgres` to login into postgres
- create a role `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';`
- alter the role for the new user `ALTER ROLE <username> CREATEDB;`
- quit postgres `\q`
- run `psql postgres -U <username>;`
- next create the database using `postgres=> CREATE DATABASE <database>;`
- grant user all priivileges to database `postgres=> GRANT ALL PRIVILEGES ON DATABASE <database> TO <username>;`
- quit postgres `\q`
- Create a `.env` file in your root directory as described in `.env-example` file and replace the data with the database credentials you just created
- run migration `npm run migrate:test`


## Start for development/Local
```
npm start
it should run on `localhost:3000`
```

## Testing
- Open a terminal and navigate to the project directory
- create a database on elephantsql and copy the url into your `env` file or you can follow set up above to create a test database
- Run `npm run test`
