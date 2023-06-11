import { Request, Response, NextFunction, Router } from 'express';



export async function index(req: Request, res: Response, next: NextFunction) {

    res.send('index action response');
}
