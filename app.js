const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "serralheria",
  multipleStatements: true,
});

db.connect((erro) => {
  if (erro) {
    console.log("Erro ao conectao ao Mysql:", erro);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

app.get("/", (req, res) => {
  res.write("teste");
  res.end();
});

app.listen(8080);
