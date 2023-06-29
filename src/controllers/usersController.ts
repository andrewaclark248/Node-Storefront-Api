//var jwt = require('jsonwebtoken');
import { User, UserStore } from './../models/user';
import { Request, Response } from 'express';
import { getTokenByUser } from './../utils';

const store = new UserStore();

export async function create(req: Request, res: Response) {
  try {
    const username = req.body?.username as string;
    const password = req.body?.password as string;
    const firstname = req.body?.firstname as string;
    const lastname = req.body?.lastname as string;

    if (username == null || password == null) {
      res.json({
        error: 'Must pass: username & password',
      });
      return;
    }

    const newUser: User = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
    };

    const user = await store.createUser(newUser);
    const token = getTokenByUser(user);

    res.json({
      token: token,
    });
  } catch (err) {
    res.json(err);
  }
}

export async function index(req: Request, res: Response) {
  try {
    const users = await store.index();

    res.json(users);
  } catch (e) {
    console.log('error', e);
  }
}

export async function show(req: Request, res: Response) {
  try {
    const id: number = Number(req.params.id);

    if (id == 0) {
      res.json({ error: 'Please pass a number' });
      return;
    }

    const user = await store.show(id);
    res.json(user);
  } catch (e) {
    console.log('error', e);
  }
}
