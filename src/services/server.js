const express = require('express');
const MainRouter = require('../routes/index')
const path = require('path')
const http = require('http');
const { ProductsController } = require('../controller/productos');

const app = express();
const server = http.Server(app);


app.use(express.json()) //PARA ENVIAR POR BODY
app.use(express.urlencoded({extended: true})) //para enviar por form

const viewsFolderPath = path.resolve(__dirname,'../../views');
app.set('view engine','ejs');
app.set('views', viewsFolderPath)

app.get('/', async (req, res)=>{
    res.render('form')
 });
 

app.use(express.static('public'));
app.use('/api', MainRouter);

//este middleware de errores se encarga de atajar todos los errores que haya en nuestras rutas
//aca metemos la logica para ver que le respondemos al cliente (si un error generico o uno definido)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});

module.exports = server;