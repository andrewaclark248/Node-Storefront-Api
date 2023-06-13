import Client from '../database'

export type ProductType = {
    name: string;
    price: Number;
    id: Number;
}

export class Product {



    async index(): Promise<ProductType[]> {
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