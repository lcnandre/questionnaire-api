# Questionnaires API

This is the repository for the Questionnaires API.
The API lets users create and share custom questionnaires simmilar to Google Forms.

## Features

- Share questionnaire via a short URL
- Update, delete and reorder questions
- For now only short answer questions are implemented

## Tech

The app was created using:
- Node: backend Javascript runtime
- Express: a fastp HTTP framework for Node
- Typescript: Javascript with static typing, similar to C# or Java
- NestJS: a progressive, unopinionated framework for Node apps
- Mikro ORM: an ORM for TS similar to Hibernate and Entity Framework
- Postgres: an opensource powerful database engine
- Apollo Server: a GraphQL platform for Node

Apart from the tech stack, the following development principles where followed:

- TDD: the tests were written first, then the production code to make the tests pass were written. The project has 100% code coverage
- DDD: the domain is well bounded between the contexts of Users and Questionnaires. Also, the project uses well-known DDD blocks, such as Entities, Repositories, Value Objects, etc.
- Clean architecture: the project has three well defined layers and all dependencies point upwards from the entities:
    - Domain: where entities and use cases goes
    - Application: where all application specific code goes, such as modules, guards, interceptors
    - IO: where all input and output is done, such as HTTP controllers and GraphQL resolvers
- CQRS: all actions on the app are use cases that are either commands or queries
- SOLID: the code is very clean and respect as much as possible the SOLID principles

## Requirements

The app requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run.

## Running the app

Install the dependencies, then use the start script

```sh
yarn && yarn start
```

After running, the API will be available at http://localhost:3000 through Apollo Sandbox.

To run the unit tests with coverage report:
```sh
yarn test:cov
```

After the tests where ran, the interactive coverage report will be available at `coverage/lcov-report/index.html`.

To run the E2E tests:

```sh
yarn test:e2e
```

The E2E tests simulates an HTTP client (such as Postman) making requests to the app and asserting the responses.

## Critique

Although the SOLID princples were followed as much as possible, I still miss some interfaces on the project to help separate definition from implementation a little more. NestJS's dependency injection system currently doesn't support injecting interfaces, like Castle in .NET or Spring in Java.

The update question feature is quite simplistic, synchronizing the database with the payload received. If, for instance, a questionnaire has 3 questions and the update payload contains only 1, the other 2 will be made orphans and deleted. It's a valid design concept, since that's probably how the frontend would work, fetching the questionnaire data, performing changes, adding new questions, deleting existing ones and sending the entire data to the API. Still, it's a rather radical approach and I think it would be better to create an `isDeleted` flag on questions to properly mark them for deletion. That way, the client could safely send to the API just the data that changed without worrying about it being deleted.

Postgres performs very well under high pressure,  making it a great choice for a "startup" app with a lot of users. If the database ever becomes a bottleneck, Postgres can be turned into a cluster with extensions like PgPool or even Citus Data. I much prefer that approach than writing raw SQL on the production code and making it harder to read and mantain. For example, if one day Postgres needs to be replaced by Cassandra, all those raw queries would need to be rewritten, wich is not ideal.

The test suite contains a bunch of duplicated code, which could be turned into a proper test suite toolset, by making test factories or even sharing common structures with related test cases.

The briefing for the project was quite open to interpretation, only listing a few required features. It was mentioned that the users should be able to generate a shareable URL, but no mention to answering the questionnaires was made or showed. Inittialy I thought of implementing answering, but with time I realized it may be out of the scope, so only the basic entities were created, but no mutations were implemented on the API.