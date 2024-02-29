const knexLib = require('knex');

const knexConfig = require('../knexfile');
const knex = knexLib(knexConfig);

async function getAllUsers() {
    const users = await knex.select().from('USERS');
    return  users;
}

async function getUserById(id) {
    const user = await knex.select().from('USERS').where({ id }).first();
    return user;
}

async function addNewUser(name, email){
    const [result] = await knex('USERS').insert({name, email}).returning('*');
    return result;
}

async function deleteUserById(id){
    await knex.delete('*').from('USERS').where({ id });
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
}

