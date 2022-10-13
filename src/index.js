const {User} = require('./db/models');
const bcrypt = require('bcrypt');
// // User.create({
// //     name: "testname2",
// //     surname: "testsurname2",
// //     email: "test@gmail.com"
// // }).then(console.log);

// // User.findByPk(2).then(console.log);

// // User.findAll().then(console.log);



// User.findAll({attributes: {exclude: ["email", "surname"]}}).then(console.log);

const hashPasswordFun = async password => {
    try{
        return bcrypt.hash(password, 10);
    }catch(e){
        throw e;
    }
}


const createUser = async data => {
    try{
        data.passwordHash = await hashPasswordFun(data.password);
        const newUser = await User.create(data);
        return newUser;
    } catch(e){
        throw e;
    }
}

// const data = {
//     firstName: 'Vasya',
//     lastName: 'Testov',
//     email: 'vassya@gmail.com',
//     login: 'vasya1',
//     age: 25,
//     password: 'admin'
// };

// createUser(data).then(console.log).catch(console.err);


const getUserById = async id => {
    try{
        const foundUser = await User.findByPk(id);
        return foundUser;
    } catch(e){
        throw e;
    }
}

// getUserById(55).then(console.log).catch(console.err);
// getUserById(100).then(console.log).catch(console.err);

const getAllUsers = async data => {
    try{
        const users = await User.findAll({
            limit:5,
            offset: 0,
            attributes: {
                exclude: ['passwordHash', 'createdAt', 'updatedAt']
            }
        });
        return users;
    } catch(e){
        throw e;
    }
}

//getAllUsers().then(console.log).catch(console.err);

const deleteUser = async id => {
    try{
        const foundUser = await User.destroy({
            where: {
                id: id
            }
        });
        return foundUser;
    } catch(e){
        throw e;
    }
}

// deleteUser(1).then(console.log).catch(console.err);

const updateUser = async (id, data) => {
    try{
        const updateUser = await User.update(data, {
            where: {id}
        });
        return updateUser;
    } catch(e){
        throw e;
    }
}

// getUserById(2).then(console.log).catch(console.err);
// updateUser(2, {email: "newemail2@mail.com", age: 333}).then(console.log).catch(console.err);