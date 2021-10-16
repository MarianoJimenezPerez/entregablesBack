const express = require('express')
const fs = require('fs')
const arrayProductos = []

function leerDatos(){
    try {  
        const data = fs.readFileSync('productos.txt', 'utf8');
        const arrayProductos = JSON.parse(data)
        const devolverNombres = arrayProductos.map((producto) => {
                return producto.title;
            });
        return `
                <div>${devolverNombres}</div>
            `
    } catch{
        throw new Error ("No se pudo leer el archivo")
    }
}
function obtenerRandom(){
    try {  
        const data = fs.readFileSync('productos.txt', 'utf8');
        const arrayProductos = JSON.parse(data)
        const devolverRandom = arrayProductos[Math.floor(Math.random() * arrayProductos.length)]
        return `
            <h1>${devolverRandom.title}</h1>
        `
    } catch{
        throw new Error ("No se pudo leer el archivo")
    }
}

const app = express()

app.get('/', (req, res) => {
    res.send("Ingresa a /productos para poder ver los productos disponibles o /productoRandom para ver un producto aleatorio")
})
app.get('/productos', (req, res) => {
    res.send(leerDatos())
})
app.get('/productoRandom', (req, res) => {
    res.send(obtenerRandom())
})

const port = 8080
const server = app.listen(port, () => {
    console.log(`"Callback posterior a la conección" ${server.address().port}`)
})
