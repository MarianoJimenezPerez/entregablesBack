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