const {storage} = require('config');

const services = require(`../services/users_${storage.type}`);
const { STATUS } = require('../constants');

async function getAllUsers(_req, resp) {
    const users = await services.getAllUsers();
    resp.json(users);
}

async function getUserById(req, resp) {
    const user = await services.getUserById(req.params.userId);

    if(user) {
        resp.json(user);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` })
    }
}

async function addNewUser(req, resp){
    const { name, email } = req.body;
    const newUser = await services.addNewUser(name, email);

    resp.send(STATUS.Created, newUser);
}

async function deleteUserById(req, resp){
    const user = await services.getUserById(req.params.userId);

    if(user) {
        await services.deleteUserById(req.params.userId);
        resp.send(STATUS.NoContent);
    } else {
        resp.send(STATUS.NotFound, { error: `User is not found` });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
}