import { Request, Response } from 'express';
import { OrderProduct, OrderStore, Order } from '../models/order';

const store = new OrderStore();

export async function create(req: Request, res: Response) {
  try {
    const products = req.body.products as unknown as OrderProduct[];
    const status = req.body.status as unknown as boolean;
    const user_id = req.body.user_id as unknown as number;
  
    if (products == null || status == null || user_id == null) {
      res.json({
        error: 'Missing Params: products, status, user_id',
      });
      return;
    }
  
    const order: Order = await store.create({
      products,
      status,
      user_id,
    });
  
    res.json(order);
  } catch (e) {
    throw new Error('error');
  }

}

export async function show(req: Request, res: Response) {

  try {
    const id = req.params.id;

    if (id == null) {
      res.json({
        error: 'Missing Params: products, status, user_id',
      });
      return;
    }
  
    const order: Order = await store.get(Number(id));
  
    res.json(order);
  } catch (e) {
    throw new Error('error');
  }

}
