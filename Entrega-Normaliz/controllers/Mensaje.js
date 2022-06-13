import MensajeModel from '../models/mensajeSchema.js';
import { normalize, schema, denormalize } from 'normalizr'
import util from 'util'

class Mensaje {

    constructor() { }

    async addMsg(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            const mensaje = {
                author: {
                    email: data.mensajes.author.email,
                    nombre: data.mensajes.author.nombre,
                    apellido: data.mensajes.author.apellido,
                    edad: data.mensajes.author.edad,
                    alias: data.mensajes.author.alias,
                    avatar: data.mensajes.author.avatar
                },
            }
            mensaje.text = data.mensajes.text
            //console.log('ESTO LLEGA AL BACK', mensaje)
            const newMsg = await MensajeModel.create(mensaje);

        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            let mensajes = await MensajeModel.find();
            let id = 'mensajes'
            return res.status(200).json({ id, mensajes });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }


    async normalizedData(req, res) {
        try {
            let mensajes = await MensajeModel.find();
            //console.log('********* MNJ **************', mensajes.mensajes.author)

            let msgOriginal = {
                id: 'mensajes',
                mensajes: mensajes.map( mensaje => ({...mensaje._doc}))
            }

           // console.log(msgOriginal)

            const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

            const schemaMensaje = new schema.Entity('mensaje', {
                author: schemaAuthor
            }, { idAttribute: '_id' })

            const schemaMensajes = new schema.Entity('mensajes', {
                mensajes: [schemaMensaje]
            }, { idAttribute: 'id' })

            let normalizedData = normalize(msgOriginal, schemaMensajes);

            console.log(util.inspect(normalizedData, false, 5, true))
            console.log("length Original", JSON.stringify(msgOriginal).length);
            console.log("length Normalize", JSON.stringify(normalizedData).length);

            res.send(normalizedData)

        } catch (error) {
            console.log(error)
        }

    }
}

export default Mensaje;