const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// parse application/json
app.use(bodyParser.json());

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


app.post('/api/clientes/login', (req, res) =>{
    let data = {
      email: conn.escape(req.body.email),
      senha: conn.escape(req.body.senha)
  };
  console.log(data);
  
  let sql = "select * from cliente where email='"+conn.escape(req.body.email)+"' and senha='"+conn.escape(req.body.senha)+"'";
  let query = conn.query(sql, data,(err, results)=> {
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
  let sql = "SELECT * FROM cliente WHERE id="+conn.escape(req.params.id);
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new product
app.post('/api/clientes',(req, res) => {
  let data = {
      nome: conn.escape(req.body.nome), 
      cpf: conn.escape(req.body.cpf),
      telefone: conn.escape(req.body.telefone),
      email: conn.escape(req.body.email),
      senha: conn.escape(req.body.senha)
  };
  
  let sql = "INSERT INTO cliente SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//update cliente
app.put('/api/clientes/:id',(req, res) => {
  let sql = "UPDATE cliente SET nome='"+conn.escape(req.body.nome)+"', cpf='"+conn.escape(req.body.cpf)+"', telefone='"+conn.escape(req.body.telefone)+"', email='"+conn(req.body.email)+"', senha='"+conn.escape(req.body.senha)+"' WHERE id="+conn.escape(req.params.id);
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//Delete cliente
app.delete('/api/clientes/:id',(req, res) => {
  let sql = "DELETE FROM cliente WHERE id="+conn.escape(req.params.id)+"";
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