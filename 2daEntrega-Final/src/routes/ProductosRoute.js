const express = require('express');
const { Router } = express;
const rutaProducto = Router();

//LLamado de los DAOS
//ARCHIVO
// const { ProductosDaoArchivo } = require('../daos/productos/ProductosDaoArchivo');
// let productosDaoArchivo = new ProductosDaoArchivo();
//FIREBASE
const { ProductosDaoFireBase } = require('../daos/productos/ProductosDaoFireBase');
let productosDaoFireBase= new ProductosDaoFireBase();
//MONGO


// // trae todos los productos

rutaProducto.get('/', async (req, res)=>{
    let productos = await productosDaoFireBase.getAll();
    console.log(productos);
    res.json({productos: productos});
});

rutaProducto.get('/:id', async (req, res)=> {
    let id = req.params.id;
    let producto = await productosDaoFireBase.getById(id);
    res.json({producto: producto});
})

rutaProducto.post('/', async (req, res)=>{
    let producto = req.body;
    console.log(req.body)
    if (producto.nombre && producto.precio && producto.codigo) {
        producto = await productosDaoFireBase.save(producto);
        res.json({result: 'GUARDADO', producto: producto});
    } else {
        res.json({result: 'ERROR AL GUARDAR'});
    }
});

rutaProducto.put('/:id', async (req, res)=>{
        let prod = req.body;
        let id=req.params.id
        if (prod.nombre && prod.precio && prod.codigo) {
            let prodUpdate = await productosDaoFireBase.update(id ,prod);
            res.json({result: 'Producto Guardado', producto: prodUpdate});
        } else {
            res.json({result: 'REVISAR DATOS'});
        }
});

rutaProducto.delete('/:id', async(req, res)=>{
    let id=req.params.id
    let producto = await productosDaoFireBase.delete(id);
    if (producto) {
        res.json({result: 'Eliminado'});
    } else {
        res.json({result: 'No se encontro el producto', producto: producto});
    }
})


module.exports = rutaProducto;