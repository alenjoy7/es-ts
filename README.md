# Express TypeScript Template

This is a template project for building RESTful APIs using [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/). It includes a basic project structure, Prisma ORM integration, and example routes, controllers, and middlewares.

## Features
- Express.js server
- TypeScript for type safety
- Prisma ORM for database access
- Example folder structure for scalable projects
- Basic error handling and logging
- [Pino](https://getpino.io/) for fast, low-overhead logging
- [Scalar](https://scalar.com/) for OpenAPI documentation UI (served at `/docs`)
- [Zod](https://zod.dev/) for schema validation

## Scalar Preview
![image](https://github.com/user-attachments/assets/427086ff-0453-43ea-a46c-010ee60a691e)


## Getting Started

### 1. Clone the Template
You can quickly start a new project using this template with [degit](https://github.com/Rich-Harris/degit):

```sh
degit alenjoy7/es-ts my-new-project
cd my-new-project
```

### 2. Install Dependencies

```sh
pnpm install
```

Or use `npm install` or `yarn install` if you prefer.

### 3. Set Up Environment Variables

Copy the example environment file and update it as needed:

```sh
cp .env.example .env
```

### 4. Generate Prisma Client

```sh
pnpm prisma generate
```

### 5. Run Database Migrations

```sh
pnpm prisma migrate dev
```

### 6. Start the Development Server

```sh
pnpm dev
```

The server will start on the port specified in your `.env` file (default is 8080).

## Project Structure

- `src/` - Source code (routes, controllers, middlewares, utils, etc.)
- `prisma/` - Prisma schema and migrations
- `generated/` - Generated Prisma client

## Notes
- This template uses [pnpm](https://pnpm.io/) by default, but you can use npm or yarn.
- Make sure to update the Prisma schema and run migrations as needed for your project.
- OpenAPI documentation is served using Scalar UI at `/docs`.
- All request/response validation is handled using Zod schemas.
- Logging is handled by Pino for high performance.


## License

MIT
