const {storage} = require('config');

const services = require(`../services/users_${storage.type}`);
const { STATUS } = require('../constants');

function asyncErrorHandler(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(next); 
    };
}

async function getAllUsers (_req, resp)  {
        const users = await services.getAllUsers();
        resp.json(users);
}

async function getUserById(req, resp, next) {
        const user = await services.getUserById(req.params.userId);

        if(user) {
            resp.json(user);
        } else {
            resp.send(STATUS.NotFound, { error: `User is not found` })
        }
}

async function addNewUser(req, resp, next){
        const { name, email } = req.body;
        const newUser = await services.addNewUser(name, email);
    
        resp.send(STATUS.Created, newUser);
}

async function deleteUserById(req, resp, next){
        const isDeleted = await services.deleteUserById(req.params.userId);

        if(isDeleted) {
            resp.send(STATUS.NoContent);
        } else {
            resp.send(STATUS.NotFound, { error: `User is not found` });
        }
}

module.exports = {
    getAllUsers: asyncErrorHandler(getAllUsers),
    getUserById: asyncErrorHandler(getUserById),
    addNewUser: asyncErrorHandler(addNewUser),
    deleteUserById: asyncErrorHandler(deleteUserById)
}