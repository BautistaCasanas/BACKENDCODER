const express = require('express');
const { Router } = express;
const rutaProducto = Router();

//LLamado de los DAOS
//ARCHIVO
// const { ProductosDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
// let productosDaoArchivo = new ProductosDaoArchivo();

//FIREBASE
// const { ProductosDaoFireBase } = require('../daos/productos/ProductosDaoFireBase');
// let productosDaoFireBase= new ProductosDaoFireBase();

//MONGO
const { ProductosDaoMongoDB } =require("../daos/productos/ProductosDaoMongo");
let productosDaoMongoDB = new ProductosDaoMongoDB();



rutaProducto.get('/', async (req, res)=>{
    let productos = await productosDaoMongoDB.getAll();
    console.log(productos);
    res.json({productos: productos});
});

rutaProducto.get('/:id', async (req, res)=> {
    let id = req.params.id;
    let producto = await productosDaoMongoDB.getById(id);
    res.json({producto: producto});
})

rutaProducto.post('/', async (req, res)=>{
    let producto = req.body;
    console.log(req.body)
    if (producto.nombre && producto.precio && producto.thumbnail) {
        producto = await productosDaoMongoDB.save(producto);
        res.json({result: 'GUARDADO', producto: producto});
    } else {
        res.json({result: 'ERROR AL GUARDAR'});
    }
});

rutaProducto.put('/:id', async (req, res)=>{
        let producto = req.body;
        let id=req.params.id
        if (producto.nombre && producto.precio && producto.thumbnail) {
            let prodUpdate = await productosDaoMongoDB.update(id ,producto);
            res.json({result: 'Producto Actualizado', producto: prodUpdate});
        } else {
            res.json({result: 'Complete los datos'});
        }
});

rutaProducto.delete('/:id', async(req, res)=>{
    let id=req.params.id
    let producto = await productosDaoMongoDB.delete(id);
    if (producto) {
        res.json({result: 'Producto Eliminado'});
    } else {
        res.json({result: 'No se encontro el producto', producto: producto});
    }
})


module.exports = rutaProducto;