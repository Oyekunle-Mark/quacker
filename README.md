# StackOverflow Clone

A StackOverflow Clone.

The API has the following functionalities:
- User Authentication
- Asking and replying questions
- Upvoting/Downvoting questions

## JSON Response Structure
The response structure for this API is fashioned after the popular JSend pattern.

Find the JSend specification [here](https://github.com/omniti-labs/jsend)

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

Do the following to start the API:
- Clone the project with `git clone https://gitlab.com/korapay-engineering/bems-oye-olo.git`
- Change directory into the project directory with `cd bems-oye-olo`
- Start the development server with `./start.sh`

API becomes available at *http://localhost:7201/api*

The SQL scripts to create the development database and tables are executed automatically when the Docker Compose start script is executed.

You can find the SQL script in the [mysql directory](/mysql) at the root of the repository.

## API Documentation

This project provides two types of API documentation specification.
The OpenAPI specification using Swagger and the Postman API documentation specification.

#### Swagger OpenAPI Documentation
The api serves a Swagger document from an endpoint.
To use it, start the server and visit *http://localhost:7201/api/docs* in your browser

#### Postman Documentation
The Postman documentation for the API has been published and can be found [here](https://documenter.getpostman.com/view/6495381/TW6zFS3W)

## Testing
Use the Docker Compose test configuration for running the integration tests.

Do the following:
- Clone the project with `git clone https://gitlab.com/korapay-engineering/bems-oye-olo.git` if don't have it already and cd into the project directory.
- Execute the tests with `./start_test.sh`

The tests will be executed and coverage report will be showed at the end.
After completion of the tests and coverage report has been shown, use `Ctrl + C` to terminate and exit.

## Assumptions
While delivering this technical test, I made the following assumptions:
- Infrastructure, modularity and code organization are just as important as functionalities.
  The above makes working in teams and keeping the development experience as enjoyable as possible. Also, scaling and adding new functionalities down the line does not become a tedious process.


- This StackOverflow clone would resemble the classic forum setup, with questions asked and answers provided.
The purpose is to limit scope with a less complex database model.
  

- Upvoting/Downvoting is limited to questions alone and not answers. Although it does not take a leap to provide upvoting/downvoting for answers,
duplicating the functionality on answers will just be work best avoided in a technical test with a short time frame to deal with.
  

- SQL scripts are used for creating databases and tables while Sequelize is used for database querying. This is to prove that this author is adept at using both methods of database engine interactions.


- The entire thing should be containerized to save others dependency hell and local machine setup. The author believes in a uniform and consistent development environment across board.
  

## Feedback
I am of the opinion that the requirements for the test are a little too much for an Engineer who has to manage work demands while delivering the assignment.
Especially the bit about a test coverage threshold. That requires some time investment that might be difficult to find with a busy schedule.

While it's nice that there is a provision for asking for an extension of the submission date, I believe technical tests are best when one can meet expectation and make submission as soon as possible.

## Author
    Oyekunle Oloyede 😎
    
    (The gunslinging back-end guy 🤘)
