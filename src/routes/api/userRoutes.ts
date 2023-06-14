import express from 'express';
const userRoutes = express.Router();
import { create, index } from '../../controllers/usersController';


//users routes
userRoutes.post('/users', create);
userRoutes.get('/users', index);

export default userRoutes;