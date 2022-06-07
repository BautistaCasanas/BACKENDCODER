const {ContainerMongoDB}= require("../../contenedores/ContenedorMongo")



class CarritoDaoMongoDB extends ContainerMongoDB {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async save(carrito = {}) {
        return super.save(carrito)
    }
    async addProductToCart(product){
        let insert = super.save(product);
        return insert
    }
}

module.exports = {CarritoDaoMongoDB}