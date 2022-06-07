const express = require("express");

const rutaCarrito = require('./src/routes/CarritoRoute');
const {rutaProducto} = require('./src/routes/ProductosRoute');


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/carrito', rutaCarrito);
app.use('/api/productos',rutaProducto);


app.listen(PORT,(req,res)=>{
    console.log("Servidor esuchando en el puerto"+PORT);
})