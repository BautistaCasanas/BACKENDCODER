const { Container } = require("../../contenedores/ContenedorFireBase");

class CarritoDaoFireBase extends Container{
    constructor(){
        super('carrito');
    }
    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

module.exports = { CarritoDaoFireBase }