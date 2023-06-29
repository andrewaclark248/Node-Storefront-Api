import app from './../../server';
import supertest from 'supertest';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';

const request = supertest(app);
const userStore = new UserStore();
const productStore = new ProductStore();
let token = '';

const newProduct = {
  name: 'product-1',
  price: 100,
};

describe('ordersController', () => {
  afterEach(async () => {
    await userStore.deleteAll();
    await productStore.deleteAll();
  });

  it('create', async () => {
    await createUser();
    const response = await request
      .post('/api/products')
      .send(newProduct)
      .set('Authorization', 'Bearer ' + token);

    expect(response.body.name).toEqual(newProduct.name);
    expect(response.body.price).toEqual(newProduct.price);
  });

  it('show', async () => {
    //create user
    await createUser();

    //create product
    const response = await request
      .post('/api/products')
      .send(newProduct)
      .set('Authorization', 'Bearer ' + token);

    //get product
    const productResponse = await request
      .get(`/api/products/${response.body.id}`)
      .set('Authorization', 'Bearer ' + token);

    expect(productResponse.body.name).toEqual(newProduct.name);
    expect(productResponse.body.price).toEqual(newProduct.price);
  });

  it('index', async () => {
    //create user
    await createUser();

    //create product
    await request
      .post('/api/products')
      .send(newProduct)
      .set('Authorization', 'Bearer ' + token);

    //get product
    const productsResponse = await request
      .get('/api/products')
      .set('Authorization', 'Bearer ' + token);

    expect(productsResponse.body.length).toBeGreaterThan(0);

  });
});

async function createUser() {
  const newUser = {
    username: 'aclark-test',
    password: 'password123',
    firstname: 'andrew',
    lastname: 'clark',
  };
  const result = await request.post('/api/users').send(newUser);
  token = result.body.token;
}
