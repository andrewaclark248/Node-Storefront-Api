import Client from '../database'
import bcrypt from 'bcrypt'

const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export type User = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
}

export class UserStore {

    async createUser(u: User): Promise<User> {
        try {

            const conn = await Client.connect();
            console.log("request recevied")

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
            console.log("stopped here")

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

}