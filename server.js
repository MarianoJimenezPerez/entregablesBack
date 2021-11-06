const express = require ('express')
const {promises: fs} = require('fs')
const { Router } = express
const { Server: HttpServer} = require('http');
const { Server: IOServer} = require('socket.io');
const app = express()
const router = Router()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let socketGuardado
const mensajes = [];

const handlebars = require('express-handlebars');   

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

const productos = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]

router.get('/productos', (req, res) => {
    res.render('table', {listaProductos: productos})
})


router.post('/productos', (req, res) => {
    let nuevoProducto = req.body
    nuevoProducto.id = productos.length + 1
    productos.push(nuevoProducto)
})

app.use('/api', router)
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('servidor ok')
})

server.on('error', error => console.log(`error en el servidor ${error}`))


app.engine(
    'txt',
    handlebars({
        extname: '.txt',
        defaultLayout: 'index.txt',
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);
io.on('connection', (socket) => {
    console.log("conectado");
    socket.emit('mensajes', mensajes)
    socketGuardado = socket
    socket.on('mensaje' , data => {
        mensajes.push({socketId: socket.id, mensaje: data});
        io.sockets.emit('mensajes', mensajes)
    })
})
app.set('view engine', 'txt')
app.set('views', './views')
