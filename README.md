# PDF Viewer REST API Server

By Felipe Almanza and Jeffry Prado

felipe.almanza@kuehne-nagel.com & jeffry.prado@kuehne-nagel.com

This is an application created using NodeJS and Express JS that provides a REST API connected to a PostgreSQL database model stored in pgwebformt1-primary.db.int.kn.

## Technologies Used

- JavaScript
- NodeJS
- ExpressJS
- PostgreSQL

## Setup/Installation

- Clone this repository to your local computer.
- In a terminal run this to install all the dependencies

```
    npm install
```

- .env file

## Run the app

    npm run dev

# REST API

The REST API is described below.

There are routes for multiple DB tables:

- /roles
- /users
- /tasks
- /task_items

## Get list of [Route Name]

### Request

`GET /[Route Name]/`

`POST /[Route Name]/`

`PUT /[Route Name]/:id/`

`DELETE /[Route Name]/id`
