import { UserStore, User } from '../../models/user';

const userStore = new UserStore();

describe('User Model', () => {
  const newUser1: User = {
    username: 'aclark',
    password: 'password123',
    firstname: 'Andrew',
    lastname: 'Clark',
  };

  const newUser2: User = {
    username: 'bjohnson',
    password: 'password123',
    firstname: 'Brian',
    lastname: 'Johnson',
  };

  afterEach(async () => {
    await userStore.deleteAll();
  });

  it('create', async () => {
    const user = await userStore.createUser(newUser1);

    expect(newUser1.username).toEqual(user.username);
    expect(newUser1.firstname).toEqual(user.firstname);
    expect(newUser1.lastname).toEqual(user.lastname);
  });

  it('index', async () => {
    await userStore.createUser(newUser1);
    await userStore.createUser(newUser2);
    const users = await userStore.index();
    const hasUser1 = users.filter((u) => {
      return u.firstname == newUser1.firstname;
    });

    expect(hasUser1.length).toEqual(1);
  });

  it('show', async () => {
    let createdUser = await userStore.createUser(newUser1);
    let user = await userStore.show(createdUser.id as number);

    expect(user.firstname).toEqual(newUser1.firstname);
    expect(user.lastname).toEqual(newUser1.lastname);
    expect(user.username).toEqual(newUser1.username);
  });

  it('deleteAll', async () => {
    await userStore.deleteAll;
    const users = await userStore.index();

    expect(users.length).toEqual(0);
  });
});
