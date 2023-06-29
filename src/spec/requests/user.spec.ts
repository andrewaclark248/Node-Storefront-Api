import app from './../../server';
import supertest from 'supertest';
import { UserStore, User } from '../../models/user';

const request = supertest(app);
const userStore = new UserStore();
let token = '';

const newUser = {
  username: 'aclark-test',
  password: 'password123',
  firstname: 'andrew',
  lastname: 'clark',
};

const authenticateSuccess = {
  username: 'aclark-test',
  password: 'password123',
};

const authenticateFailure = {
  username: 'bad-username',
  password: 'bad-password',
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

    expect(response.body.length).toEqual(1);
  });

  it('show', async () => {
    await createUser();
    const getUserResponse = await request
      .get('/api/users')
      .set('Authorization', 'Bearer ' + token);
    let id = getUserResponse.body[0].id;
    const response = await request
      .get(`/api/users/${id}`)
      .set('Authorization', 'Bearer ' + token);
    let user = response.body;

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
  let result = await request.post('/api/users').send(newUser);
  token = result.body.token;
}
