//var jwt = require('jsonwebtoken');
import  jwt  from 'jsonwebtoken';
import client from './../database'
import { Request, Response, NextFunction, Router } from 'express';


export async function create(req: Request, res: Response, next: NextFunction) {

    try {
        //const connection = await client.connect()

      res.send('post request received');

    } catch(err) {

    }

}


