# MGL Exchange (Demo)

Crypto Exchange

## Installation for local test

1. Clone the repo
2. Install [Node.js 16](https://nodejs.org/en/blog/release/v16.16.0).
3. Install [MySQL 8](https://dev.mysql.com/downloads/mysql/8.0.html).

   - Create a database named `mgldefi`.

   - Execute the schema written in [`new-mgldefi.sql`](/backend/src/db/new_mgldefi.sql).

4. Set up the environment variables in [.env](/backend/.env).
   
   - MySQL connection configurations

     Example:

     ```shell
     HOST=localhost:3306
     DB_USER=root
     DB_PASS=user_password
     DB_DATABASE=mgldefi
     ```

   - SMTP server configurations

     Example:

     ```shell
     SMTP_HOST=mail.smtp2go.com
     SMTP_PORT=2525
     SMTP_AUTH_USER=user_name
     SMTP_AUTH_PASS=user_password
     SMTP_SENDER_EMAIL_ADDRESS=from_email_address
     ```

5. Set up Server URL in [env.js](/src/constants/env.js).

   - Example

     ```shell
     export const SERVER_URL = "http://localip:5000/api/"
     ```

6. Run the backend and frontend

     ```shell
     yarn dev
     ```

## What to improve?

1. Use ESLint and Prettier together to automatically format and fix JavaScript code in your projects
2. Use docker for testing MySQL environment
3. Use TypeScript as it's more readable and maintainable than JavaScript
4. On FE's point of view, define all API endpoints in one place and clean hardcoded URLs across all places
