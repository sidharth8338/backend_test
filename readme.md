# Sponsorlytix Backend

It's a straightforward backend application that handles login, registration, and user profile updates. I've built it using technologies like Node.js and Express to ensure efficiency and reliability.

## Table of Contents

- [Installation](#installation)
  - [Server](#server)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
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

## Configuration

For the server, make sure to set up a `.env` file with your MongoDB connection URI.
Adjust any other configuration parameters as needed.
