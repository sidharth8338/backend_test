# Sponsorlytix Backend

It's a straightforward backend application that handles login, registration, and user profile updates. I've built it using technologies like Node.js and Express to ensure efficiency and reliability.

## Table of Contents

- [Installation](#installation)
  - [Server](#server)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [API Docs](#api)
  - [Register](#register)
  - [Login](#login)
  - [Profile](#profile)
- [Deployments](#deployment)
  - [Vercel](#vercel)
- [Configuration](#configuration)

## Installation

### Server

Navigate to the server directory if you are not in the directory

```bash
cd sponsorlytix
```

Install Dependencies

```bash
npm install
```

Create a `.env` file and specify `MONGO_URI`:

```bash
touch .env
```

```bash
MONGO_URI=<your_mongo_uri>
```

## Usage

### Development

Server

```bash
cd sponsorlytix
npm run dev
```

### Production

Server

```bash
cd sponsorlytix
npm start
```

## API

### Register

- EndPoint: All fields are required here you can't miss one of these as shown in the req body.

```bash
POST /api/v1/register
```

- Request Body (JSON):

```bash
{
    "email": "sidharth@abc.co",
    "password": "test123",
    "username": "sidhu"
}
```

- Response (JSON):

```bash
{
    "success": true,
    "message": "OK",
    "error": null,
    "results": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzMjE3YTE3ODUyODM2NmIxMGUzZWRiIiwiaWF0IjoxNzE0NTU4ODgxLCJleHAiOjE3MTQ2NDUyODF9.K5BxMYdDFWgMymdPH-YitbD6dtBMdX3VY1W2Z6sImuM",
        "message": "Successfully Verified"
    }
}
```

### Login

- EndPoint: Logs in the user with their email address or username and password.

```bash
POST /api/v1/login
```

- Request Body (JSON):

```bash
{
    "username": "sidhu",
    "password": "test123"
}
```

- Response (JSON):

```bash
{
    "code": 200,
    "success": true,
    "message": "OK",
    "error": null,
    "results": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzMWRjZjA0OTg3MzNjYzc2OWY5MDAzIiwiaWF0IjoxNzE0NTQ1MDQ5LCJleHAiOjE3MTQ2MzE0NDl9.6xnE-naUcU5Ld4y_7HyP8sqXwCtlsTmtNBDLk38ymnA",
        "message": "Successfully Verified"
    }
}
```

### Profile

- EndPoint: This is a update profile API which will be used to update the user profile and if you want to update password then you need to give an additional field 'confirm_password' in req body otherwise other fields are (email, username)

```bash
PATCH /api/v1/updateProfile
```

- Request Body (JSON):

```bash
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYzMWRjZjA0OTg3MzNjYzc2OWY5MDAzIiwiaWF0IjoxNzE0NTQ1MDQ5LCJleHAiOjE3MTQ2MzE0NDl9.6xnE-naUcU5Ld4y_7HyP8sqXwCtlsTmtNBDLk38ymnA",
    "password": "test123",
    "confirm_password": "test123"
}
```

- Response (JSON):

```bash
{
    "success": true,
    "message": "OK",
    "error": null,
    "results": {
        "_id": "6631dcf0498733cc769f9003",
        "username": "sidhu",
        "email": "sidhart@abc.co",
        "password": "$2a$10$f19AXcE2/yiUaKWPZIS/feY9V/UGx5YXzZMMYG1xFS8l4PXMeKoTO",
        "__v": 0
    }
}
```

## Deployment

The API is deployed on Vercel using the following services:

- [Vercel](https://vercel.com/) for deployment and hosting of the serverless functions.
- Need to add vercel config json to the repo and the filename should be vercel.json

```bash
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

## Configuration

For the server, make sure to set up a `.env` file with your MongoDB connection URI.
Adjust any other configuration parameters as needed.
