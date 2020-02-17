const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();



// parse application/json
app.use(bodyParser.json());

const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodeteste', 'nownxlol', 'pkfull99', {
    "host": "mysql669.umbler.com",
    "dialect": "mysql"
})

sequelize.authenticate().then(() =>{
    console.log("Sucesso")    
}).catch((erro) =>{
    console.log(erro)
})

//create database connection
const conn = mysql.createConnection({
  host: 'mysql669.umbler.com',
  user: 'nownxlol',
  password: 'pkfull99',
  database: 'nodeteste'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

const Produto = sequelize.define('produto', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

Produto.sync({force: true})

app.get('/', (req, res) =>{
    res.render(__dirname + "/html/index.html")
});
app.get('/produtos/add', (req, res) =>{
    res.send("rota de cadastro");
});

app.post('/api/clientes/login', (req, res) =>{
    let data = {
      email: req.body.email,
      senha: req.body.senha
  };
  console.log(data);
  
  let sql = "select * from cliente where email='"+req.body.email+"' and senha='"+req.body.senha+"'";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show all clientes
app.get('/api/clientes',(req, res) => {
  let sql = "SELECT * FROM cliente";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//show single cliente
app.get('/api/clientes/:id',(req, res) => {
  let sql = "SELECT * FROM cliente WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new product
app.post('/api/clientes',(req, res) => {
  let data = {
      nome: req.body.nome, 
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      email: req.body.email,
      senha: req.body.senha
  };
  
  let sql = "INSERT INTO cliente SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//update cliente
app.put('/api/clientes/:id',(req, res) => {
  let sql = "UPDATE cliente SET nome='"+req.body.nome+"', cpf='"+req.body.cpf+"', telefone='"+req.body.telefone+"', email='"+req.body.email+"', senha='"+req.body.senha+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete cliente
app.delete('/api/clientes/:id',(req, res) => {
  let sql = "DELETE FROM cliente WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.get('/api/produtos', (req, res) => {
    let sql = "select * from produto";
    let querry = conn.query(sql, (err, results) => {
        if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });

});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});