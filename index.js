// app.js

// Import necessary modules
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Create Express app
const app = express();
const port = 8080;

// Middleware for parsing POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Override HTTP methods for forms (e.g., PUT, DELETE)
app.use(methodOverride('_method'));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "backend",
  password: "sql123",
});

// Define routes
app.get("/", (req, res) => {
  try {
    const q = `SELECT COUNT(*) FROM user`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      const count = result[0]["COUNT(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs")
  }
});




app.get("/users", (req, res) => {
  try {
    let q = "SELECT * FROM user";

    // Check if a search query is provided
    if (req.query.search) {
      const searchTerm = req.query.search;
      q = `SELECT * FROM user WHERE username LIKE '%${searchTerm}%'`;
    }

    connection.query(q, (err, userss) => {
      if (err) throw err;
      res.render("users.ejs", { userss });
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

app.get("/users/:id/delete", (req, res) => {
  let id = req.params.id;

  try {
    let q = `SELECT * FROM user WHERE id='${id}'`;

    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

app.get("/users/:id/edit", (req, res) => {
  let id = req.params.id;

  try {
    let q = `SELECT * FROM user WHERE id='${id}'`;

    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpass, username: newusername } = req.body;

  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("User not found");
      } else {
        let user = result[0];

        if (formpass !== user.password) {
          res.render("password-error.ejs")
        } else {
          let q2 = `DELETE FROM user WHERE id='${id}'`;
          connection.query(q2, (err, updateResult) => {
            if (err) throw err;
            res.redirect("/users");
          });
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { password: formpass, username: newusername } = req.body;

  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        res.send("User not found");
      } else {
        let user = result[0];

        if (formpass !== user.password) {
       res.render("password-error.ejs")
        } else {
          let q2 = `UPDATE user SET username='${newusername}' WHERE id='${id}'`;
          connection.query(q2, (err, updateResult) => {
            if (err) throw err;
            res.redirect("/users");
          });
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

// Update the route to match the form action
app.get("/user/add", (req, res) => {
  res.render("addUser.ejs");
});

// Update the route to match the form action
app.post("/user/new/add", (req, res) => {
  try {
    let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
    let id = req.body.id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let values = [id, username, email, password];

    connection.query(q, values, (err, result) => {
      if (err) throw err;
      res.redirect("/users");
    });
  } catch (err) {
    console.error(err);
    res.render("error.ejs");
  }
});

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
