import {  UserStore, User } from '../../models/user';

const userStore = new UserStore();


describe("User Model", () => {

    const newUser1: User = {
        username: "aclark",
        password: "password123",
        firstname: "Andrew",
        lastname: "Clark"
      };


    const newUser2: User = {
        username: "bjohnson",
        password: "password123",
        firstname: "Brian",
        lastname: "Johnson"
    };


    it("createUser", async () => {
        const user = await userStore.createUser(newUser1)

        expect(newUser1.username).toEqual(user.username)
        expect(newUser1.firstname).toEqual(user.firstname)
        expect(newUser1.lastname).toEqual(user.lastname)

    })


    fit("index", async () => {
        let user1 = await userStore.createUser(newUser1)
        let user2 = await userStore.createUser(newUser2)

        const users = await userStore.index()

        //const hasUser1 = users.includes(newUser1)
       // expect(hasUser1).toBeTrue();

    })

})