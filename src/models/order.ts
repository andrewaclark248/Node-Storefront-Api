import Client from '../database'

export interface OrderProduct {
    product_id: number,
    quantity: number
  }
  
export interface BaseOrder {
    products: OrderProduct[];
    user_id: number;
    status: boolean;
}

export interface Order {
    products: OrderProduct[];
    user_id: number;
    status: boolean;
    id: number;
}


export class OrderStore {


    async create(newOrder: BaseOrder) {
        try {
            const conn = await Client.connect();

            //create orders
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const { rows } = await conn.query(sql, [newOrder.user_id, newOrder.status]);
            const order = rows[0];

            //create order_products
            const orderProductsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity';
            const orderProducts = [];

            for (const product of newOrder.products) {
                const { product_id, quantity } = product;
                const { rows } = await conn.query(orderProductsSql, [order.id, product_id, quantity]);
                orderProducts.push(rows[0]);
            }

            conn.release();

            return {
                ...order,
                products: orderProducts,
            };
        } catch(err) {
            console.log("some error")
        }
    }


}


