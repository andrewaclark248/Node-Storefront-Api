import Client from '../database'

export type User = {
    firstName: string;
    lastName: string;
    password: string;
    id: Number;
}

export class Product {

    async createUser(u: User): Promise<User> {
        try {
            // @ts-ignore
            const connection = await pool.connect()
            const sql =
                'INSERT INTO users (username, first_name, last_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.firstName}. Error: ${err}`
            )
        }
    }


    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows
        } catch (err) {
            throw new Error("error")
        }

    }

}