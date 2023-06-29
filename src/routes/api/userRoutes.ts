import express from 'express';
const userRoutes = express.Router();
import { create, index, show } from '../../controllers/usersController';
import { verifyToken } from './../../utils/index'

//users routes
userRoutes.post('/users', create);
//userRoutes.post('/users/authenticate', authenticate);
userRoutes.get('/users', verifyToken, index);
userRoutes.get('/users/:id', verifyToken, show);

export default userRoutes;