import app from './../../server';
import supertest from 'supertest';
import { UserStore } from '../../models/user';

const request = supertest(app);
const userStore = new UserStore();
let token = '';

const newUser = {
  username: 'aclark-test',
  password: 'password123',
  firstname: 'andrew',
  lastname: 'clark',
};

describe('usersController', () => {
  afterEach(async () => {
    await userStore.deleteAll();
  });

  it('create', async () => {
    const response = await request.post('/api/users').send(newUser);

    expect(response.body.token).toBeDefined();
  });

  it('index', async () => {
    await createUser();
    const response = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);

      expect(response.body.length).toBeGreaterThan(0);
  });

  it('show', async () => {
    await createUser();
    const getUserResponse = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);
      const id = getUserResponse.body[0].id;
    const response = await request
      .get(`/api/users/${id}`)
      .set('Authorization', 'Bearer ' + token);
    const user = response.body;

    expect(user.firstname).toEqual(newUser.firstname);
    expect(user.lastname).toEqual(newUser.lastname);
    expect(user.username).toEqual(newUser.username);
  });

  it('show auth failure', async () => {
    const response = await request.get(`/api/users/1`);

    expect(response.body).toEqual('Access denied, invalid token');
  });

  it('index', async () => {
    const response = await request.get('/api/users');

    expect(response.body).toEqual('Access denied, invalid token');
  });
});

async function createUser() {
  const result = await request.post('/api/users').send(newUser);
  token = result.body.token;
}
