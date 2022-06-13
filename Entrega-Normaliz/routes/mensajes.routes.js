import express from 'express';
import Mensaje from '../controllers/Mensaje.js';
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.post('/', msg.addMsg);
routerMsg.get('/', msg.findAllMsg);
routerMsg.get('/norm', msg.normalizedData);

export default routerMsg;