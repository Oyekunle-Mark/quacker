# bems-oye-olo

A StackOverflow Clone.

The API has the following functionalities:
- User Authentication
- Asking and replying questions
- Upvoting/Downvoting questions

## Technologies

#### Infrastructure
This project uses Docker and Docker-Compose extensively. It creates two Docker-Compose configurations.
A development and a test configurations for development and integration testing respectively.

#### Reverse Proxy
Nginx is used as a reverse proxy and all requests passes through it to the Node server.
The docker compose configuration only exposes the Nginx instance to the internet. Every other service
(Node API and MySQL instance) are assigned internal ports only.

#### Runtime/Language
The web server is written in Node.js(TypeScript). The Express web application framework is used.

#### Database
MySQL is the database of choice. Sequelize is used as an ORM by the web server for performing DB queries.

## Installation and Setup

You must have Docker and Docker-Compose installed on your machine before you can run this server.

Check if your Docker setup is fine with `docker ps`. You should get some response if it is.

Docker setup and troubleshooting is beyond the scope of this README. Please use the internet.

Do the following to start the API:
- Clone the project with `git clone https://gitlab.com/korapay-engineering/bems-oye-olo.git`
- Change directory into the project directory with `cd bems-oye-olo`
- Start the development server with `./start.sh`

API becomes available at *http://localhost:7201/api*

The SQL scripts to create the development database and scripts are executed automatically when the Docker Compose start script is executed.

You can find the SQL script in the [mysql directory](/mysql) at the root of the repository.

## API Documentation

This project provides two types of API documentation specification.
The OpenAPI specification using Swagger and the Postman API documentation specification.

#### Swagger OpenAPI Documentation
The api serves a Swagger document from an endpoint.
To use it, start the server and visit *http://localhost:7201/api/docs* in your browser

#### Postman Documentation
The Postman documentation for the API has been published and can be found [here](https://documenter.getpostman.com/view/6495381/TW6zFS3W)


## Author
    Oyekunle Oloyede 😎
    
    (The gunslinging back-end guy 🤘)
