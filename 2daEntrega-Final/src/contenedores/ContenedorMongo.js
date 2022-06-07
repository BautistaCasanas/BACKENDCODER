const mongoose = require('mongoose');
const URIMDB = 'mongodb+srv://admin1:admin1@ecommerce.c98cs.mongodb.net/?retryWrites=true&w=majority';

const {Schema} = require("mongoose")

class ContainerMongoDB {
  constructor(colleccion, esquema) {
    mongoose.connect(URIMDB, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Servidor con MONGO conectado con la collection '+ colleccion))
    this.modelo = mongoose.model(colleccion, new Schema(esquema));
  }

  async getAll(){
    return await this.modelo.find({});
  }

async getById(id){
    let prod = await this.modelo.find({_id: id});
    console.log(prod);
    return prod
  }

  async save(item){
    const saveModel = new this.modelo(item);
    let newItem = await saveModel.save();
    console.log(newItem);
    return newItem
  }
  async update(id,elemento) {
      console.log(elemento);
       let update = await this.modelo.findByIdAndUpdate(id,elemento)
       console.log(update);
       return update
    }

    async delete(id){
        let delProd = await this.modelo.findByIdAndDelete(id);
        return delProd
    }
}

module.exports = {ContainerMongoDB}