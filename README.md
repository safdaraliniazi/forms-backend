# Backend for My Project

## Overview

This repository contains the backend code for the [Your Project Name] application. It is built using Node.js and Express, and it handles API requests for managing submissions.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Requirements

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/safdaraliniazi/forms-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd forms-backend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

Create a `db.json` file in the root of the project directory to store submissions. Here is an example of what the file should look like:

```json
{
  "submissions": []
}

```

Running the Application
To start the server, run the following command:

```
npm start
```
The server will start on port 3000 by default. You can access it at http://localhost:3000.


# API Endpoints
## Ping Endpoint
- URL: /ping
- Method: GET
- Description: Health check endpoint to verify if the server is running.
- Response: true

## Submit Endpoint
- URL: /submit
- Method: POST
- Description: Endpoint to submit a new submission.

### Request Body

```
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "github_link": "string",
  "stopwatch_time": "string"
}
```
### Response

```
{
  "message": "Submission received"
}
```
## Read Endpoint

- URL: /read
- Method: GET
- Description: Endpoint to retrieve all submissions.

### Response

```
[
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "github_link": "string",
    "stopwatch_time": "string"
  },
  ...
]
```






