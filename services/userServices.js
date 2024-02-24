const fs = require('fs');
const path = require('path');

let users =[];
const dataPath = path.join(process.cwd(), 'data', 'db.json');

try {
    users = JSON.parse(fs.readFileSync(dataPath, 'utf8')); 
} catch (error) {
    console.log(`Error reading file ${dataPath}: ${error.message}`);
}

function getAllUsers() {
    return users;
}

function getUserById(id) {
    return users.find(user => user.userId === Number(id));
}

function addNewUser(username, email){
    const userId = users[users.length-1].userId + 1;

    const newUser = {
        userId, 
        username, 
        email
    };
    users.push(newUser);

    return newUser;
}

function deleteUserById(id){
    users = users.filter(user => user.userId !== Number(id)); 
}

process.on('SIGINT', () => { 
    try {
        fs.writeFileSync(dataPath, JSON.stringify(users));
    } catch (error) {
        console.log(`Error writing file ${dataPath}: ${error.message}`);
    }
});

process.on('beforeExit', () => { 
    try {
        fs.writeFileSync(dataPath, JSON.stringify(users));
    } catch (error) {
        console.log(`Error writing file ${dataPath}: ${error.message}`);
    }
});

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    deleteUserById
}