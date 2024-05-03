# SimpleCRM

SimpleCRM is a web application built using Node.js, Express.js, and Prisma ORM, designed to provide a subscription-based invoicing solution for businesses. It offers features for managing clients, suppliers, invoices, and orders.

## Features

- Create, read/single, update, and delete clients
- Create, read/single, update, and delete suppliers ( fournisseurs )
- Create, read/single, update, and delete invoices ( factures )
- Create, read/single, update, and delete orders ( commandes )

## Project Structure

The project is structured as follows:

- **controllers/**: Contains controller functions for handling various HTTP requests and responses related to clients, suppliers, invoices, and orders.
- **prisma/**: Contains the Prisma schema file defining the database schema and models.
- **routers/**: Contains router files defining the API routes for different resources.
- **app.js**: The main entry point of the application where the Express app is initialized, middleware is set up, and routes are defined.

## Usage

- **Clients**: Access client management functionalities at /api/clients.
- **Fournisseurs**: Access supplier management functionalities at /api/fournisseurs.
- **Factures**: Access invoice management functionalities at /api/factures.
- **Commandes**: Access order management functionalities at /api/commandes.

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- MySQL
- Nodemon (for automatic server restarts during development)

## Getting Started

1. Clone the repository:
git clone https://github.com/kadiriayman96/SimpleCRM-nodejs-express-mysql

2. Install dependencies:
npm intall

3. Set up environment variables:
Create a `.env` file in the root directory and add the following environment variables:
DATABASE_URL=mysql://user:password@localhost:3306/database_name
Replace `user`, `password`, and `database_name` with your MySQL credentials and database name.

4. Run the application:
npm start
The application should now be running on http://localhost:3000.

## License

This project is licensed under the [ISC License](LICENSE).







