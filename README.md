# LOAN REQUEST API

## How to test this API locally?
- Make sure `NodeJS` and `Postgres` are installed in your computer.
- Run `git clone https://github.com/erickyvand/loan-request-backend.git` in your terminal.
- Run `cd loan-request-backend` to be in the project directory
- Run `npm install` to install all dependences.
- Create `.env` file in the root folder
- Check `.env.example` to get examples of environment variables
- Create a postgres database
- Run `npm run migrate:up` to migrate models in the database you have created.
- Run `npm run dev:server` to start the server

## Endpoints
- POST `/national-id-number`: to create an identification
- GET `/national-id-number/:idNumber`: to get an identification
- POST `/tin-number`: to create a TIN number
- GET `/tin-number/:tinNumber`: to get a TIN number information
- POST `/auth/register`: to register a user
- POST `/auth/login`: to login a user
- POST `/loan`: to create a loan request
- GET `/loan`: to get all loan requests
- GET `/loan/approved`: to get approved requests
- PATCH `/loan/requestId/approve`: to approve a request
- PATCH `/loan/requestId/reject`: to reject a request

## Technologies used
- NodeJs/Express
- Postgres
- Sequelize

## Contributor
- Iragena Eric (erickyvand)