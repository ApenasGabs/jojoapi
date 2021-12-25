const express = require('express');
const server = express();
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const session = require('express-session')
const path = require("path")
const dados=require('./src/data/dados.json')
server.use(session({ secret: 'adkaskfaokfoaskfoakf', resave: true, saveUninitialized: true }))
server.set("views", path.join(__dirname, 'views'))
server.set("view engine", "ejs")


//header


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')//quem pode acessar a api
    res.header('Acess-Control-Allow-Headers', 'Origin,X-Requrested-With ,Content-Type, Accept,Autorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET')//CRUD
        return res.status(200).send({});//resposta
    }


    next();

}

)
server.use((req, res, next) => {
    res.locals.admin = false;
    next()
})

server.use(express.static(__dirname + '/public'));
server.get('/',(req,res)=>{
    res.render('index.ejs',{key:"home"})
})

server.get('/howtouse',(req,res)=>{
    res.render('index.ejs',{key:"how"})
})

server.get('/about',(req,res)=>{
    res.render('index.ejs',{key:"about"})
})
server.get('/hexagraph',(req,res)=>{
    res.render('index.ejs',{key:"hex"})
})
server.get('/jojostands',(req,res)=>{
    res.send(dados)
})
server.get('/jojostands/stand/:n',(req,res)=>{
    res.send(dados[req.params.n])
})

server.use((req, res, next) => {
    const erro = new Error("not found");
    erro.status = 404;
    next(erro);
})

server.use((erro, req, res, next) => {
    res.status(erro.status || 500)
    return res.send(`
    <head>
   <title>ERRO ${erro.status} </title>
    </head>
    <body>
    <h1>erro ${erro.status}</h1> 
    <img width="100px" src="https://www.pinclipart.com/picdir/big/151-1519806_anime-face-png-graphic-black-and-white-kono.png">
    <p>
   
    você achou que ia char uma pagina, mas achou eu ERRO ${erro.status}!
    </p> 
    <hr>
    <p>
    ${erro}
    </p>
    
    recarregue a pagina ou volte para a home

    </body>`)



})









server.listen(port, () => { console.log(`servidor funcionando na porta ${port}`) })