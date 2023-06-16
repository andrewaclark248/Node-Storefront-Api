import express from 'express';
const orderRoutes = express.Router();
import { create } from '../../controllers/ordersController';
import { verifyToken } from './../../utils/index'

//product routes
orderRoutes.post('/order', verifyToken, create);
