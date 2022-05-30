const {ContainerArchivo}=require("../../contenedores/ContenedorArchivo");

class CarritoDaoArchivo extends ContainerArchivo{
    constructor(){
        super('./src/data/carrito.json');
        let cart = this.getAll();
        this.id = (cart.length > 0) ? cart.length + 1 : 1;
        this.timesTrap= new Date();
    }

    async getAll() {
        let carritos = await this.getContent();
        return carritos;
    }

    async getById(id) {
        let carritos = await this.getAll();            
        let cart = null;
        if(carritos.length > 0) {
            let element = carritos.filter(elem => elem.id == parseInt(id));
            if(element) {
                cart = element;
            }
        }
        return cart;
    }

    async save() {
        let carritos = await this.getAll();
        let diaCart = Date();
        let productos = [];
        let carrito = {id:this.id, fecha: diaCart, productos: productos}
        carritos.push(carrito);
        this.guardarLocal(carritos);
    }

    async addProductToCart(cartId, producto) {
        let carritos = await this.getAll();
        let carro = null;
            if(carritos.length > 0) {
                let element = carritos.find(elem => elem.id == cartId);
                    if(element) {
                        element.productos.push(producto);
                        carro = element;
                        let delCarrito = await this.deleteById(cartId)
                        carritos.push(carro);
                        console.log(JSON.stringify(carritos));
                        let sortedArray = carritos.sort((a, b)=> a.id - b.id);
                        this.guardarLocal(carritos);
                    }

            }
            return carro;
    }

    async getProdById(id){
        let carrito = await this.getById(id);
        if(carrito.length > 0) {
            return carrito.productos;
        }
    }

    async delete(id) {
        let carts = await this.getAll();
        if(carts.length > 0) {
            let elements = carts.filter((elem) => elem.id != id);
            if(elements) {
                await this.guardarLocal(elements);
            }
        }
        return carts;
    }
}
module.exports = {CarritoDaoArchivo}