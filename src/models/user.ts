import Client from '../database'
import bcrypt from 'bcrypt'
import { AuthenticateResult } from './../interfaces/index'

const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export type User = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    id?: number;
}

export class UserStore {

    async createUser(u: User): Promise<User> {
        try {

            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password, username) VALUES($1, $2, $3, $4) RETURNING *'
            const hashedPassword = bcrypt.hashSync(
                u.password + pepper, 
                saltRounds
             );
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                hashedPassword,
                u.username
            ])
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.username}. Error: ${err}`
            )
        }
    }


    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch (err) {
            throw new Error("error")
        }

    }

    async show(id: Number): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users WHERE id=($1)"
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error("error")
        }
    }

    /****
    async authenticate(username: string, password: string): Promise<AuthenticateResult> {
        let result: boolean = false;
        const sql: string = "SELECT * FROM users WHERE username=($1)";
        const conn = await Client.connect();
        const {rows} = await conn.query(sql, [username])
        let user: User | null = null;

        if (rows.length > 0) {
            user = rows[0]
            if (bcrypt.compareSync(password + pepper, user!.password)) {
                result = true
            } 
          }

        return { user: user, success: result };
    } ****/

    async deleteAll() {
        try {
            const conn = await Client.connect();
            const deleteAllOrderProducts = 'DELETE FROM order_products;';
            await conn.query(deleteAllOrderProducts);
            const deleteAllOrders = 'DELETE FROM orders;';
            await conn.query(deleteAllOrders);
            const deleteAllUsers = 'DELETE FROM users;';
            await conn.query(deleteAllUsers);
            conn.release();
        } catch (err) {
            console.log("custom error", err)
            throw new Error("error")
        }
    }

}