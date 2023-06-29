import { ProductStore, ProductType } from '../../models/product';

const productStore = new ProductStore();

describe('Product Model', () => {
  afterEach(async () => {
    await productStore.deleteAll();
  });

  const newProduct1: ProductType = {
    name: 'product-name',
    price: 100,
  };

  const newProduct2: ProductType = {
    name: 'product-name2',
    price: 200,
  };

  it('create', async () => {
    const product = await productStore.createProduct(newProduct1);

    expect(newProduct1.name).toEqual(product.name);
    expect(newProduct1.price).toEqual(product.price);
  });

  it('index', async () => {
    await productStore.createProduct(newProduct1);
    await productStore.createProduct(newProduct2);
    const products = await productStore.index();

    expect(products.length).toBeGreaterThan(0);

  });

  it('show', async () => {
    const createdProduct = await productStore.createProduct(newProduct1);
    const product = await productStore.show(createdProduct.id as number);

    expect(product.name).toEqual(newProduct1.name);
    expect(product.price).toEqual(newProduct1.price);
  });

  it('deleteAll', async () => {
    await productStore.createProduct(newProduct1);
    await productStore.deleteAll();
    const products = await productStore.index();

    expect(products.length).toEqual(0);
  });
});
