import Client from '../database'

export type ProductType = {
    name: string;
    price: Number;
}

export class ProductStore {


    async createProduct(product: ProductType): Promise<ProductType> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
            const result = await conn.query(sql, [
                product.name,
                product.price
            ])

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not add new product. Error: ${err}`
            )
        }
    }


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

    async show(id: Number): Promise<ProductType> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM products WHERE id=($1)"
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (err) {
            throw new Error("error")
        }

    }

}