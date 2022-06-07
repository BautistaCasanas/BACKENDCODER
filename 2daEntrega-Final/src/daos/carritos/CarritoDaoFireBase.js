const { ContenedorFirebase } = require("../../contenedores/ContenedorFireBase");



class CarritoDaoFireBase extends ContenedorFirebase{
    constructor(){
        super('carrito');
    }
    async save(carrito = {}) {
        return super.save(carrito)
    }

    async addProductToCart(product){
        // let cart =  await super.getById(cartId);
        // console.log(cart);
        let insert = super.save(product);
        return insert
    }
}

module.exports =  {CarritoDaoFireBase}