const { ContainerArchivo } = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContainerArchivo{

    constructor(){
        super("./src/data/productos.json");
        this.productos = this.getAll();
        this.id = (this.productos.length > 0) ? this.productos.length + 1 : 1;
    }

    
    async save(prod) {
        let productos = await this.getAll();
        let producto = {id: this.id, ...prod}
        productos.push(producto);
        await this.guardarLocal(productos);
        this.id++;
    }


    async update(id,prod) {
        let products = await this.getAll();
        const productIndex =products.findIndex(p=>p.id == id);
        console.log(productIndex);
        if(productIndex == -1){
            throw new Error("Producto No encontrado");
        }
        let productoActualizado ={
            id: Number(id),
            nombre:prod.nombre,
            precio:prod.precio,
            thumbnail:prod.thumbnail
        };
        console.log(productoActualizado);
        products[productIndex] = productoActualizado;

        this.guardarLocal(products)

        return products
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

    async delete(id) {
        let productos = await this.getAll();
        let itemToDelete = productos.filter(e=>e.id !== Number(id));
        this.guardarLocal(itemToDelete);
        return itemToDelete
    }
}

module.exports = { ProductosDaoArchivo }