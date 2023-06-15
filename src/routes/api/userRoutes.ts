import express from 'express';
const userRoutes = express.Router();
import { create, index, authenticate } from '../../controllers/usersController';
import { verifyToken } from './../../utils/index'

//users routes
userRoutes.post('/users', create);
userRoutes.get('/users', verifyToken, index);
userRoutes.post('/users/authenticate', authenticate);

export default userRoutes;