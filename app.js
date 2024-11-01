const express = require("express");
const { engine } = require("express-handlebars");

const mysql = require("mysql");

const app = express();

// configuracao do express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

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
  res.render("formulario");
});

app.listen(8080);
