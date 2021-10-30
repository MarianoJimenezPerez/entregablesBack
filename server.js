const express = require ('express')
const {promises: fs} = require('fs')
const { Router } = express
const app = express()
const router = Router()

const handlebars = require('express-handlebars');   

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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

router.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.json( { error: 'El parámetro ingresado no es un número' } )
    }
    if ( id < 1 || id > productos.length) {
        return res.json( { error: 'producto no encontrado'} )
    }

    res.json({ producto: productos[id - 1]})
})

router.get('/productos2', (req, res) => {
    res.render('main', {})
    /*const tituloNuevo = document.getElementById('productTitle').value
    const precioNuevo = document.getElementById('productPrice').value
    const thumbnailNuevo = document.getElementById('productThumbnail').value
    const sendForm = document.getElementById('send-form')
    sendForm.addEventListener('click', () => {
        const productoNuevo = {
            title: tituloNuevo,
            price: precioNuevo,
            thumbnail: thumbnailNuevo
        }
        productos.push( productoNuevo )
        productos[productos.length - 1].id = productos.length
    })*/
})


router.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let productoModificado = productos.find(producto => producto.id === id)
    if (isNaN(id)) {
        return res.json( { error: 'Ingrese un ID válido' } )
    }
    if ( id < 1 || id > productos.length) {
        return res.json( { error: 'producto no encontrado'} )
    }
    productoModificado = req.body
    res.json({ productoModificado})
})

router.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const productoAEliminar = productos.findIndex(producto => producto.id === id)
    productos.splice(productoAEliminar, 1)
    if (isNaN(id)) {
        return res.json( { error: 'Ingrese un ID válido' } )
    }
    if ( id < 1 || id > productos.length) {
        return res.json( { error: 'producto no encontrado'} )
    }
    res.json(productos)
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
app.set('view engine', 'txt')
app.set('views', './views')
