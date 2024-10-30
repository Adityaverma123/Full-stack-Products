# Full Stack Application

This project contains both the frontend and backend applications. Follow the instructions below to run them in parallel.


## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/)
  - Make sure PostgreSQL is running and set up with a database for this project.
  - Note down your database name, username, password, and host (typically `localhost`), as you’ll need them in the backend configuration. 


## Setup Instructions

1. Clone the Repository

Clone this repository to your local machine:

git clone https://github.com/Adityaverma123/Full-stack-Products.git

cd astra-invest

2. Install Dependencies

For Backend
Navigate to the backend directory and install the dependencies:
cd backend
npm install

For Frontend
Open another terminal, navigate to the frontend directory and install the dependencies:
cd frontend
npm install

3. Running the Applications

Backend: 
In the backend terminal, There's a one time script to setup the schema:

cd backend
npm run init
It will run the script and create required database and tables

Once done, run the application

npm run dev

Frontend: 
In the frontend terminal, start the development server:
cd frontend
npm start

4. Accessing the Application

Frontend: Open your browser and go to http://localhost:3000.
Backend: Check http://localhost:9000/api/health is returning "I am healthy"

5. Notes

Ensure PostgreSQL is running and that the backend is connected to the correct database before starting.
For time being, FE is storing auth token in local storage. Ideally it should be stored in http only cookie. This makes the application more secure(because they’re not accessible via JavaScript) + localStorage is only accessible in the browser, not on the server. Therefore, server side calls are not possible. Http only cookie is accessible in both server and client.

6. Troubleshooting

If you encounter issues, ensure that all dependencies are installed correctly and that the correct ports are not in use.
Check the console logs for any errors that might indicate what went wrong.


