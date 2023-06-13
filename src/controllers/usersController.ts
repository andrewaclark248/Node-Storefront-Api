//var jwt = require('jsonwebtoken');
import  jwt  from 'jsonwebtoken';
import { User, UserStore } from './../models/user'
import { Request, Response, NextFunction, Router } from 'express';

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

        //console.log("user result", user);

        res.json({
            success: true
        })

    } catch(err) {

    }

}


