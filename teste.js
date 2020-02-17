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