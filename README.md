# Backend Setup (Node.js + Prisma + MySQL + TypeScript)

---

## Step 1: Initialize backend project folder

Created a new backend folder to hold Node.js, Prisma ORM, MySQL,
and authentication APIs for the Task Management application.

## Step 2: Initialize Node.js project

run: npm init -y

Initialize a new Node.js project with default settings automatically.

## Step 3: Install TypeScript dependencies

run: npm install typescript tsx @types/node --save-dev

Installed TypeScript and development tools for type-safe backend development.

## Step 4: Generate tsconfig.json

run: npx tsc --init
Generated a default tsconfig.json file using the TypeScript CLI

## Step 5: Install required dependencies
run:
npm install prisma @types/node --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv

Here's what each package does:

prisma - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
@prisma/client - The Prisma Client library for querying your database
@prisma/adapter-mariadb - The MySQL/MariaDB driver adapter that connects Prisma Client to your database
dotenv - Loads environment variables from your .env file


## Step 6: Configure ESM support


Update tsconfig.json with:


{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}

Update package.json to enable ESM:
{
  "type": "module"
}

## Step 7: Initialize Prisma ORM
npx prisma


Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

npx prisma init --datasource-provider mysql --output ../generated/prisma

This command does a few things:

Creates a prisma/ directory with a schema.prisma file containing your database connection and schema models
Creates a .env file in the root directory for environment variables
Creates a prisma.config.ts file for Prisma configuration
The generated prisma.config.ts file looks like this:

-- prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});


## Step 8: Configure environment variables

Open `.env` and update:

DATABASE_URL="mysql://root:password@localhost:3306/task_manager"
PORT=3000
JWT_SECRET=supersecretjwtkey


## Step 9: Define your data model

Open `prisma/schema.prisma` and update:

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  status    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}


## Step 10: Run migration

run: npx prisma migrate dev --name init

This creates database tables based on the schema.


## Step 11: Generate Prisma Client

run: npx prisma generate

Generates Prisma Client for database queries.

## Step 12 : Instantiate Prisma Client
Now that you have all the dependencies installed, you can instantiate Prisma Client. You need to pass an instance of the Prisma ORM driver adapter adapter to the PrismaClient constructor:

--- lib/prisma.ts

import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };


## Step 13: Install Express and middleware

run:

npm install express cors cookie-parser
npm install -D @types/express @types/cors @types/cookie-parser

-- Type dependencies
npm i --save-dev @types/express
npm i --save-dev @types/cors
npm i --save-dev @types/cookie-parser

Installed Express.js and middleware for API development.

## Step 14: Install authentication libraries

run:

npm install bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken

Installed bcrypt for password hashing and JWT for authentication.

---

## Step 15: Create source folder

run:
mkdir src

Created src directory for application code.

---

## Step 16: Setup Express server

Create file: `src/index.ts`

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Server running ");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


## Step 17: Add development script


Open `package.json` and add:

"scripts": {
      "dev": "tsx watch src/index.ts"
}


## Step 18: Run server

run:

npm run dev

Expected output:

Server running on port 3000


## ----------- Extra --------

## Step 19: Install Zod

run:

npm install zod

Used for request validation.

---

## Step 20: Install http-status-codes

run: npm install http-status-codes

Used for clean and readable HTTP responses.
