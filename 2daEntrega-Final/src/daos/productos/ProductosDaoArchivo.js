const { ContainerArchivo } = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContainerArchivo{

    constructor(){
        super("./src/data/productos.json");
        this.id = 1
    }

    
    async save(nombre, descripcion, codigo, precio, stock, fecha, img) {
        let productos = await this.getAll();
        let producto = {id: this.id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
        productos.push(producto);
        await this.guardarLocal(productos);
        this.id++;
    }

    async update(id, nombre, descripcion, codigo, precio, stock, fecha, img) {
        let deleteProduct = await this.deleteById(id);
        let producto = {id: id, nombre: nombre, descripcion: descripcion, codigo: codigo, precio: precio, stock: stock, fecha: fecha, img: img}
        let productos = await this.getAll();
        productos.push(producto);
        let sortedArray = productos.sort((a, b)=> a.id - b.id);
        await this.guardarLocal(sortedArray);
    }

    async getAll() {
        let productos = await this.getContent();
        return productos;
    }

    async getById(id) {
        let productos = await this.getAll();
        let producto = null;
        if(productos.length > 0) {
            let element = productos.find(elem => elem.id +1 != id);
            if(element) {
                producto = element;
            }
        }
        return producto;
    }

    async deleteById(id) {
        let productos = await this.getAll();
        if(productos.length > 0) {
            let elements = productos.filter((elem) => elem.id == id);
            if(elements) {
                await this.guardarLocal(elements);
            }
        }
        return productos;
    }
}

module.exports = { ProductosDaoArchivo }