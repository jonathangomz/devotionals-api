<p align="center">
  <img src="./main.svg" width="80" alt="Personal Page Logo"/>
</p>
<p align="center">API for ASD devotionals</p>

## Description

An API for retrieve ASD devotionals. \
The database connection string is read from the `MONGODB_URI` environment variable, not hardcoded in the source. See [Configuration](#configuration). \
Feel free to use it.

## Installation

```bash
# Clone the repository
$ git clone https://github.com/jonathangomz/devotionals-api.git

# Install the dependencies
$ cd devotionals-api
$ npm install
```

## Configuration

The app needs a MongoDB connection string. It is read from the `MONGODB_URI`
environment variable and is **not** stored in the repository.

```bash
# Create your local env file from the template
$ cp .env.example .env

# Then edit .env and set MONGODB_URI to your own connection string
```

`MONGODB_URI` is required: the app throws on startup if it is missing rather
than attempting to connect to an undefined URI. `.env` is gitignored, so never
commit it or paste a real credential into the source.

> **Note:** the original Heroku deployment for this project is retired. The
> `Procfile` is left over from it and is no longer used.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation
Read the [Documentation][1] for more information of how to use the api.

[1]: https://documenter.getpostman.com/view/5868491/TVCjwkw2

## Stay in touch

- Author - [Jonathan Gomez](https://jonathangomz.codes)
- Twitter - [@jonathangomz](https://twitter.com/JonathanGomZ)
