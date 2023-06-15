//var jwt = require('jsonwebtoken');
import  jwt  from 'jsonwebtoken';
import { User, UserStore } from './../models/user'
import { Request, Response, NextFunction, Router } from 'express';
import { getTokenByUser } from "./../utils"

const store = new UserStore();


export async function create(req: Request, res: Response, next: NextFunction) {

    try {
        let username = req.body?.username as string;
        let password = req.body?.password as string;
        let firstname = req.body?.firstname as string;
        let lastname = req.body?.lastname as string;

        if (username == null || password == null) {
            res.json({
                error: "Must pass: username & password"
            });
            return;
        }

        const newUser: User = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
        }

        const user = await store.createUser(
            newUser
        )
        const token = getTokenByUser(user);

        res.json({
            token: token
        })

    } catch(err) {

    }

}


export async function index(req: Request, res: Response, next: NextFunction) {

    const users = await store.index();

    res.json(users)
}


export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const username = req.body?.username as string;
    const password = req.body?.password as string;

    if (username == null || password == null) {
        res.json({error: "Please pass both username & password"})
        return;
    }

    const result = await store.authenticate(username, password)
    
    const token = getTokenByUser(result.user as User);

    res.json(token)
}


export async function show(req: Request, res: Response, next: NextFunction) {
    const id: number = Number(req.params.id)

    if (id == 0) {
        res.json({error: "Please pass a number"})
        return;
    }

    const user = await store.show(id)
    res.json(user)
}