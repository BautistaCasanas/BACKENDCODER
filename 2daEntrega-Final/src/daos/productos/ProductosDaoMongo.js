const {ContainerMongoDB}= require("../../contenedores/ContenedorMongo")


class ProductosDaoMongoDB extends ContainerMongoDB {

    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
}

module.exports = {ProductosDaoMongoDB}