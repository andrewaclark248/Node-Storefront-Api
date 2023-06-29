import app from './../../server';
import supertest from 'supertest';
import { UserStore, User } from '../../models/user';
import { ProductStore } from '../../models/product';
import { OrderStore } from '../../models/order';

const request = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
let token = '';
let productId: number = 0;

const newProduct = {
  name: 'product-1',
  price: 100,
};

describe('ordersController', () => {
  afterEach(async () => {
    await userStore.deleteAll();
    await productStore.deleteAll();
    await orderStore.deleteAll();
  });

  it('create', async () => {
    await createUserAndProduct();
    let responseBody = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);
    let user_id = responseBody.body[0].id;

    let requestBody = {
      products: [{ product_id: productId, quantity: 2 }],
      user_id: user_id,
      status: true,
    };
    let result = await request
      .post('/api/order')
      .send(requestBody)
      .set('Authorization', 'Bearer ' + token);

    expect(result.body.user_id).toEqual(user_id);
    expect(result.body.status).toEqual(true);
    expect(result.body.products).toContain({
      product_id: productId,
      quantity: 2,
    });
  });

  it('show', async () => {
    //create product
    await createUserAndProduct();
    let responseBody = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);
    let user_id = responseBody.body[0].id;

    let requestBody = {
      products: [{ product_id: productId, quantity: 2 }],
      user_id: user_id,
      status: true,
    };
    let result = await request
      .post('/api/order')
      .send(requestBody)
      .set('Authorization', 'Bearer ' + token);
    let orderId = result.body.id;

    //get order
    let order = await request
      .get(`/api/order/${orderId}`)
      .set('Authorization', 'Bearer ' + token);

    expect(order.body.user_id).toEqual(user_id);
    expect(order.body.status).toEqual(true);
    expect(order.body.products).toContain({
      product_id: productId,
      quantity: 2,
    });
  });
});

async function createUserAndProduct() {
  //create user
  const newUser = {
    username: 'aclark-test',
    password: 'password123',
    firstname: 'andrew',
    lastname: 'clark',
  };
  let result = await request.post('/api/users').send(newUser);
  token = result.body.token;

  //create product
  const newProduct = {
    name: 'product-1',
    price: 100,
  };
  let productResponse = await request
    .post('/api/products')
    .send(newProduct)
    .set('Authorization', 'Bearer ' + token);
  productId = productResponse.body.id;
}
