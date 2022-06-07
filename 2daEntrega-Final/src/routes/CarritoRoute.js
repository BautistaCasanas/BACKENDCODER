const express = require('express');

const { Router } = express;
const rutaCarrito = Router();


//LLamado de los DAOS
//ARCHIVO
const { CarritoDaoArchivo } = require('../daos/carritos/CarritoDaoArchivo');
let carritosDaoArchivo = new CarritoDaoArchivo();
const { ProductosDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
let productosDaoArchivo = new ProductosDaoArchivo();
//FIREBASE
// const { CarritoDaoFireBase } = require('../daos/carritos/CarritoDaoFireBase');
// let carritoDaoFireBase= new CarritoDaoFireBase();
// const { ProductosDaoFireBase } = require('../daos/productos/ProductosDaoFirebase');
// let productosDaoFireBase = new ProductosDaoFireBase();

//MONGO
// const {CarritoDaoMongoDB}=require("../daos/carritos/CarritoDaoMongo");
// let carritoDaoMongoDB = new CarritoDaoMongoDB();
// const {productosDaoMongoDB}= require("./ProductosRoute");


//Obtener todos los prod del carrito

rutaCarrito.get("/productos",(req,res)=>{
    try{
        let carts = carritosDaoArchivo.getAll();
    res.status(200).json({Carrito:carts});
    }catch(Error){
        res.status(500).json({Error: "No hay un carrito con productos"});
    }
});

//crea el carrito
rutaCarrito.post("/",(req,res)=>{
    carts = carritosDaoArchivo.save();
    if (carts) {
        res.status(200).json({result:"Carrito guardado", cart: carts});
    }else{
        res.status(500).json({result:"No se pudo guardar el carrito"})
    }
})

//Añade producto al carrito
rutaCarrito.post("/:id/producto/:id_prod", async (req,res)=>{
    let cartId = req.params.id;
    // console.log(cartId);
    let product = await productosDaoArchivo.getById(req.params.id_prod);
    console.log(product);

    if(cartId && product){
        let cart = await carritosDaoArchivo.addProductToCart(product,cartId);

        res.status(200).json({result:"Producto agregado al carrito", cart:cart});
    }else{
        res.status(500).json({Result:"No se pudo agregar el producto al carrito"})
    }
})

//Elimina el carrito segun su id

rutaCarrito.delete("/:id",(req,res)=>{
    let id = req.params.id;
    let cart = carritosDaoArchivo.delete(id);

    if(id && cart){
        res.status(200).json({Result:"Carrito Borrado con exito"});
    }else{
        res.status(500).json({Error:"No se pudo borrar el carrito"})
    }
})



module.exports = rutaCarrito;