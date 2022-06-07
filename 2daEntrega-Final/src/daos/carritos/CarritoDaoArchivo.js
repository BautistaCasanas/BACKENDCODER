const {ContainerArchivo}=require("../../contenedores/ContenedorArchivo");

class CarritoDaoArchivo extends ContainerArchivo{
    constructor(){
        super('./src/data/carrito.json');
        let cart = this.getAll();
        this.id = (cart.length > 0) ? cart.length + 1 : 1;
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
        let cart = {id:this.id, productos:[]};
        carritos.push(cart);
        this.guardarLocal(carritos);
        return cart
    }

    async addProductToCart(product,cartId) {
        console.log(product);
        let carts = await this.getAll();
        let cart = null;

        if(carts.length > 0){
            let e = carts.find(elem=>elem.id == cartId);
            if(e){
                e.productos.push(product);
                cart = e;
            }
            this.guardarLocal(carts)
        }
        return cart;
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