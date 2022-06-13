/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import router from './routes/productos.routes.js'
import routerMsg from './routes/mensajes.routes.js'
import mongoose from 'mongoose';

import Mensaje from './controllers/Mensaje.js';
const msg = new Mensaje();

import Producto from './controllers/Producto.js';
const prodClass = new Producto();


// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

/* -- MOONGOSE -- */
const uri = 'mongodb+srv://admin1:admin1@ecommerce.c98cs.mongodb.net/?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
mongoose.connect(uri, options)
    .then(() => { console.log('Conectado a Mongo') },
        err => { err }
    )

/* -- ARCHIVOS ESTATICOS -- */
app.use(express.static('public'));

/* -- MIDDLEWARES -- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);


/* -------------------- Web Sockets ---------------------- */

let toChat = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    io.sockets.emit('new-message-server', toChat)
    
    socket.on('new-message', async data => {
        const mensajes = await data;
        toChat.push(data);
        msg.addMsg({ mensajes })
        io.sockets.emit('new-message-server', toChat)
    });

    socket.on('new-producto', async data => {
        const producto = await data;
        prodClass.add({ producto })
        io.sockets.emit('new-prod-server', producto)
    });

});



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));
