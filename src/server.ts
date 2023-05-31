import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/api/apiRoutes';
import routes from './routes/index';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

//routes
app.use('/api', apiRoutes);
app.use('/', routes);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


export default app;