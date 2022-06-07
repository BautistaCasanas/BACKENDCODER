const express = require('express');

const { Router } = express;
const rutaCarrito = Router();

//LLamado de los DAOS
//ARCHIVO
// const { CarritoDaoArchivo } = require('../daos/carritos/CarritoDaoArchivo');
// let carritosDaoArchivo = new CarritoDaoArchivo();
// const { ProductosDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
// let productosDaoArchivo = new ProductosDaoArchivo();
//FIREBASE
// const { CarritoDaoFireBase } = require('../daos/carritos/CarritoDaoFireBase');
// let carritoDaoFireBase= new CarritoDaoFireBase();
// const { ProductosDaoFireBase } = require('../daos/productos/ProductosDaoFirebase');
//  let productosDaoFireBase = new ProductosDaoFireBase();

//MONGO
const {CarritoDaoMongoDB}=require("../daos/carritos/CarritoDaoMongo");
let carritoDaoMongoDB = new CarritoDaoMongoDB();
const { ProductosDaoMongoDB } = require('../daos/productos/ProductosDaoMongo');
 let productosDaoMongoDB = new ProductosDaoMongoDB();

//Obtener todos los prod del carrito

rutaCarrito.get("/productos",(req,res)=>{
    try{
        let carts = carritoDaoMongoDB.getAll();
    res.status(200).json({Carrito:carts});
    }catch(Error){
        res.status(500).json({Error: "No hay un carrito con productos"});
    }
});

//crea el carrito
rutaCarrito.post("/",(req,res)=>{
    carts = carritoDaoMongoDB.save();
    if (carts) {
        res.status(200).json({result:"Carrito guardado", cart: carts});
    }else{
        res.status(500).json({result:"No se pudo guardar el carrito"})
    }
})

//Añade producto al carrito
rutaCarrito.post("/:id/producto/:id_prod", async (req,res)=>{
    let cartId = req.params.id;
    let product = await productosDaoMongoDB.getById(req.params.id_prod);
    console.log(product);

    if(cartId && product){
        let cart = await carritoDaoMongoDB.addProductToCart(product);

        res.status(200).json({result:"Producto agregado al carrito", cart:cart});
    }else{
        res.status(500).json({Result:"No se pudo agregar el producto al carrito"})
    }
})

//Elimina el carrito segun su id

rutaCarrito.delete("/:id",(req,res)=>{
    let id = req.params.id;
    let cart = carritoDaoMongoDB.delete(id);

    if(id && cart){
        res.status(200).json({Result:"Carrito Borrado con exito"});
    }else{
        res.status(500).json({Error:"No se pudo borrar el carrito"})
    }
})



module.exports = rutaCarrito;