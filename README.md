# NodeMySQLCRUD

This project is a web application built using Express.js, EJS, HTML, CSS, and MySQL. It provides a simple CRUD (Create, Read, Update, Delete) interface for managing user data.

## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Setting Up MySQL](#setting-up-mysql)
- [Running the Application](#running-the-application)
- [Routes](#routes)


## Description

This web application serves as a basic user management system, allowing users to view, add, edit, and delete user data. It uses Express.js as the backend framework, EJS for templating, and MySQL as the database. The application has a clean and responsive design, making it user-friendly.

## Requirements

- **Node.js:** Ensure that Node.js is installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).
- **MySQL:** Make sure you have MySQL installed. You can download it from [https://www.mysql.com/](https://www.mysql.com/).

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/inaveed-git/your-repo.git


2. **Navigate to the project folder:**

    ```bash
    cd your-repo
    ```

3. **Install dependencies:**

   ```bash
    npm install
    ```
## Setting Up MySQL
1. Install MySQL on your machine if not already installed.
2. Create a new database named backend:

```bash
CREATE DATABASE backend;
```

3. Import the provided MySQL data from `SQLData/UserData.sql`:
 
```bash
cd /path/to/your/project
mysql -u your_username -p backend < SQLData/UserData.sql
```
**Replace your_username with your MySQL username.**

## Running the Application
Start the application:
```bash
npm start
```
**Visit http://localhost:8080 in your web browser.**

## Routes

1.  `/:` Home page
2. `/users:` View all users
3. `/users/:id/edit:` Edit user details
4. `/users/:id/delete:` Delete user
5. `/user/add:` Add a new user






