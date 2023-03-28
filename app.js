const express = require('express');

const app = express(); // se crea instancia de express
const cors = require('cors')
const fileUpload = require('express-fileupload')

/**
 * importación de rutas
 */
const tipoEquipo = require('./routes/tipoEquipo')
const estado = require('./routes/estado')
const marca = require('./routes/marca')
const usuario = require('./routes/usuario')
const inventario = require('./routes/inventario')
/**
 * middlewares
 */
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(cors({
    origin: '*'
}))

/* Rutas */
app.use('/api/tipoEquipo', tipoEquipo)
app.use('/api/estado', estado) 
app.use('/api/marcas', marca) 
app.use('/api/usuarios', usuario);
app.use('/api/inventarios', inventario)

app.get("*", (req, res) => {
    return res.status(404).json({
        msj: 'pagina no encontrada'
    });
});

module.exports = app;