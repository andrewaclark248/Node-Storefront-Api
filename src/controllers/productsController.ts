import { Request, Response } from 'express';
import { ProductStore, ProductType } from './../models/product';

const store = new ProductStore();

export async function index(req: Request, res: Response) {
  const products = await store.index();

  res.json(products);
}

export async function show(req: Request, res: Response) {
  const id: number = Number(req.params.id);

  if (id == 0) {
    res.json({ error: 'Please pass a number' });
    return;
  }

  const product = await store.show(id);
  res.json(product);
}

export async function create(req: Request, res: Response) {
  try {
    const name = req.body?.name as string;
    const price = req.body?.price as string;

    if (name == null || price == null) {
      res.json({
        error: 'Must pass: name & price',
      });
      return;
    }

    const newProduct: ProductType = {
      name: name,
      price: Number(price),
    };

    const product = await store.createProduct(newProduct);
    res.json(product);
  } catch (err) {
    res.json(err);
  }
}
