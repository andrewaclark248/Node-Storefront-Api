import express from 'express';
const apiRoutes = express.Router();
import { index } from '../../controllers/productsController';
import { create } from '../../controllers/usersController';

//product routes
apiRoutes.get('/products', index);


//users routes
apiRoutes.post('/users', create);




export default apiRoutes;