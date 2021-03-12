# Project-42

A back-end application written in Node.js using MongoDB as a storage solution.

The server will be hosting a nation simulation that is meant to replicate economies, politics and social aspects.

## Current Features

### Node Js

- Joi added for input validation
- Mongoose data validation
- /api/nations path added with CRUD operations
- /api/nations path added with CRUD operations
- /api/auth path added for user authentication
- Uncaught exceptions and rejections are now caught

### Users

- Basic storage of user information
- CRUD Operations for MongoDB
- Input validation
- /api/nations/ POST request now only shows limited info

### Nations

- Basic storage of nation information
- CRUD Operations for MongoDB
- Input validation when sending CRUD req
- User Authentication
- Access limitations
    - Restrict DELETE requests to the owner only
    - Restrict PUT requests to owner only
- Integration tests added
    - Still needs more code coverage

### Authentication

- User authentication added
- A JWT token is assigned to a user when he logs in

## WIP

### Node.js

- Error logging with winston

### Users

- Write more tests

### Nations

- Write tests

### Authentication

- User can log out (remove auth header token)