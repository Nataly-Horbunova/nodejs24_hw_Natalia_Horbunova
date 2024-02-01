
const fsAsync = require('fs/promises');
const path = require('path');

function doesExist(item, arr) {
    return arr.includes(item);
}

async function isDir(path) {
    const stat = await fsAsync.stat(path)
    return stat.isDirectory();
}

async function syncFiles(sourceDir, tragetDir) {


}

async function start () {
    const sourceDir = path.join('.', 'source');
    const tragetDir = path.join('.', 'target');

    // await syncFiles(sourceDir, tragetDir);
}

module.exports = {
    start
};