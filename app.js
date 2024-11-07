const express = require("express");
const { engine } = require("express-handlebars");

const mysql = require("mysql");

const app = express();

// configuracao do express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
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

app.get("/", (req, res) => res.render("formulario"));
// renderizando pagina web

app.get("/teste", (req, res) => res.render("teste"));

app.post("/cadastrar", (req, res) => {
  // Obter dados do cliente para BD
  let nome = req.body.nome;
  let endereco = req.body.endereco;
  let telefone = req.body.telefone;
  let tipoCliente = req.body.tipoCliente;
  let documento = req.body.documento;

  // Definir a variável insertSQL fora da função
  let insertSQL;

  // Função para inserir cliente no banco
  const insertClient = (nome, endereco, telefone, tipoCliente, documento) => {
    // Verifique o tipo de cliente e construa a SQL
    if (tipoCliente === "PF") {
      insertSQL = `INSERT INTO clientes (nm_cliente, ds_cliente, tel_cliente, tp_cliente, cpf, cnpj)
                   VALUES ('${nome}', '${endereco}', '${telefone}', '${tipoCliente}', '${documento}', NULL)`;
    } else if (tipoCliente === "PJ") {
      insertSQL = `INSERT INTO clientes (nm_cliente, ds_cliente, tel_cliente, tp_cliente, cpf, cnpj)
                   VALUES ('${nome}', '${endereco}', '${telefone}', '${tipoCliente}', NULL, '${documento}')`;
    } else {
      console.log('Tipo de cliente inválido. Use "PF" ou "PJ" apenas!');
      return; // Se o tipo de cliente for inválido, não execute a query
    }

    // Executar a query
    db.query(insertSQL, (erro, sucesso) => {
      if (erro) {
        console.log("Erro ao inserir cliente:", erro);
        res.status(500).send("Erro ao inserir cliente");
      } else {
        console.log("Cliente inserido com sucesso:", sucesso);
        res.status(200).send("Cliente cadastrado com sucesso");
      }
    });
  };

  // Chamar a função para inserir o cliente
  insertClient(nome, endereco, telefone, tipoCliente, documento);
});

app.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
