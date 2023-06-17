import express from 'express';
const orderRoutes = express.Router();
import { create, show } from '../../controllers/ordersController';
import { verifyToken } from './../../utils/index'

//order routes
orderRoutes.post('/order', verifyToken, create);
orderRoutes.get("/order/:id", verifyToken, show)


export default orderRoutes;