import express from 'express';
const userRoutes = express.Router();
import { create, index, authenticate } from '../../controllers/usersController';


//users routes
userRoutes.post('/users', create);
userRoutes.get('/users', index);
userRoutes.post('/users/authenticate', authenticate);

export default userRoutes;