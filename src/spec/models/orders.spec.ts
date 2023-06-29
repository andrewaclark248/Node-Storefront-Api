import { UserStore, User } from '../../models/user';
import { ProductStore, ProductType } from '../../models/product';
import { OrderStore, UserOrder, OrderProduct } from '../../models/order';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();

const newUser: User = {
  username: 'aclark',
  password: 'password123',
  firstname: 'Andrew',
  lastname: 'Clark',
};

const newProduct1: ProductType = {
  name: 'product-name1',
  price: 100,
};

const newProduct2: ProductType = {
  name: 'product-name2',
  price: 200,
};

describe('Order Model', () => {
  afterEach(async () => {
    await orderStore.deleteAll();
  });

  it('create', async () => {
    const userOrder = await createUserAndProduct();
    const order = await orderStore.create(userOrder);

    expect(order.user_id).toEqual(userOrder.user_id);
    expect(order.products).toContain(userOrder.products[0]);
    expect(order.products).toContain(userOrder.products[1]);
  });

  it('get', async () => {
    const userOrder = await createUserAndProduct();
    const newOrder = await orderStore.create(userOrder);
    const order = await orderStore.get(newOrder.id);

    expect(order.user_id).toEqual(userOrder.user_id);
    expect(order.products).toContain(userOrder.products[0]);
    expect(order.products).toContain(userOrder.products[1]);
  });

  it('deleteAll', async () => {
    //create order
    const userOrder = await createUserAndProduct();
    const newOrder = await orderStore.create(userOrder);
    const order = await orderStore.get(newOrder.id);

    //verify order was created
    expect(order.user_id).toEqual(userOrder.user_id);
    expect(order.products).toContain(userOrder.products[0]);
    expect(order.products).toContain(userOrder.products[1]);

    //delete order
    await orderStore.deleteAll();

    //verify order was deleted
    const deletedOrder = await orderStore.get(newOrder.id);
    expect(deletedOrder?.user_id).toBeUndefined();
    expect(deletedOrder?.status).toBeUndefined();
    expect(deletedOrder?.products.length).toEqual(0);
  });
});

async function createUserAndProduct(): Promise<UserOrder> {
  //create user
  const user = await userStore.createUser(newUser);
  //create product
  const product1 = await productStore.createProduct(newProduct1);
  const product2 = await productStore.createProduct(newProduct2);

  const order1: OrderProduct = { product_id: product1.id as number, quantity: 1 };
  const order2: OrderProduct = { product_id: product2.id as number, quantity: 1 };

  const userOrder: UserOrder = {
    products: [order1, order2],
    user_id: user.id as number,
    status: true,
  };

  return userOrder;
}
