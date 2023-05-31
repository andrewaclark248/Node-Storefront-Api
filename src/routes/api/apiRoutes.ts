import express from 'express';
const apiRoutes = express.Router();
import { index } from '../../controllers/productsController';

//product routes
apiRoutes.get('/products', index);

export default apiRoutes;