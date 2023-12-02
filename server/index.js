require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.post('/create', (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const gender = req.body.gender;
  const ip_address = req.body.ip_address;

  db.query("INSERT INTO users (first_name, last_name, email, gender, ip_address) VALUES (?,?,?,?,?)",
  [first_name, last_name, email, gender, ip_address],
  (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send("Values inserted");
      console.log("Values insered");
    }
  });
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const first_name = req.body.first_name;

  db.query("UPDATE users SET first_name = ? WHERE id = ?",
  [first_name, id], (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  })

});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }else{
      res.send(result);
    }
  })
})



//Server
app.listen('3001', () => {
  console.log('Server is running on port 3001');
})