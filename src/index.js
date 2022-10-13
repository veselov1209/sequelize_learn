const {User, Task} = require('./db/models');
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


//-----------------------TASKS--------


const createTask = async data => {
    try{
        const newTask = await Task.create(data);
        return newTask;
    } catch(e){
        throw e;
    }
}

const getTaskById = async id => {
    try{
        const foundTask = await Task.findByPk(id);
        return foundTask;
    } catch(e){
        throw e;
    }
}

const deleteTaskById = async taskId => {
    try{
        const foundTask = await Task.destroy({
            where: {
                id: taskId            }
        });
        return foundTask;
    } catch(e){
        throw e;
    }
}


const updateTaskById = async (id, data) => {
    try{
        const [updatedRowCount, updatedRows] = await Task.update(data, {
            where: {id},
            returning: true
        });
        if(updatedRowCount){
            const task = updatedRows[0].get();
            return task;
        }
    } catch(e){
        throw e;
    }
}



const getAllTasks = async data => {
    const {limit, offset} = data;
    try{
        const tasks = await Task.findAll({
            limit,
            offset,
            order: ['deadline', 'ASC'],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        return tasks;
    } catch(e){
        throw e;
    }
}


const testTask = {
    UserId: 10,
    name: 'Test task for 10 user',
    isDone: false,
    deadline: '2022-10-10 14:00'
};


//createTask(testTask).then(console.log).catch(console.err);
//getTaskById(1).then(console.log).catch(console.err);
//updateTaskById(1, {isDone: true}).then(console.log).catch(console.err);
//getTaskById(1).then(console.log).catch(console.err);

const getTaskByUserId = async (userId) => {
    try{
        const tasks = await Task.findAll({
            order: ['deadline'],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                UserId: userId
            }
        });
        return tasks;
    } catch(e){
        throw e;
    }
}

// getTaskByUserId(10).then(console.log).catch(console.err);

async function getUsersWithTasks() {
    try{
        const res = User.findAll({
            attributes:{
                exclude: ['passwordHash']
            },
            include: [{
                model: Task
            }]
        });
        //return res.map(i => i.get());
        return res;
    }catch(e){
        throw e;
    }
}

getUsersWithTasks().then(console.log);