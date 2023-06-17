import { Request, Response, NextFunction, Router } from 'express';
import { BaseOrder, OrderProduct, OrderStore, Order } from '../models/order';

const store = new OrderStore();


export async function create(req: Request, res: Response) {

    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;

    if (products == null || status == null || user_id == null) {
        res.json({
            error: 'Missing Params: products, status, user_id'
        });
        return;
    }

    const order: Order = await store.create({
        products,
        status,
        user_id,
    });

    res.json(order);

}


export async function update(req: Request, res: Response) {
    const id: number = Number(req.params.id)// as number;
    const products = req.body.products as OrderProduct[];
    const status = req.body.status as boolean;
    const user_id: number = Number(req.body.user_id) //as number;

    if (id == null ||
        status == null || 
        products == null ||
        user_id == null) {

        res.json({error: "Must have have the following params: id, products, status, user_id"})
        return;
    }

    const order: Order = await store.update(id, {
        products,
        status,
        user_id,
    }); 

  
    res.json(order)

}