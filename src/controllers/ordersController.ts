import { Request, Response, NextFunction, Router } from 'express';
import { BaseOrder, OrderProduct, OrderStore, Order } from '../models/order';


const store = new OrderStore();


const create = async (req: Request, res: Response) => {

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