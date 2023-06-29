import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/api/productRoutes';
import userRoutes from './routes/api/userRoutes';
import orderRoutes from './routes/api/orderRoutes';

import routes from './routes/index';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

//routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/', routes);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
