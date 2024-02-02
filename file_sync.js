
const fsAsync = require('fs/promises');
const path = require('path');
const logger = require('./utils/logger')('main');

function doesExist(item, arr) {
    return arr.includes(item);
}

async function isDir(path) {
    const stat = await fsAsync.stat(path)
    return stat.isDirectory();
}

async function copyFile(sourcePath, targetPath) {
    const fileContent = await fsAsync.readFile(sourcePath, 'utf8');
    await fsAsync.writeFile(targetPath, fileContent);
}

async function syncFiles(sourceDir, tragetDir) {
    const sourceDirFiles = await fsAsync.readdir(sourceDir);
    const targetDirFiles = await fsAsync.readdir(tragetDir);

    sourceDirFiles.forEach(async (file) => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(tragetDir, file);

        if (!await isDir(sourcePath)) {
            if(!doesExist(file, targetDirFiles)) {
                await copyFile(sourcePath, targetPath);
                logger.info(`File ${file} has successfully been created in ${targetPath}`);
            } else {
                logger.warn(`File ${file} already exsists`);
            }
        } else {
            if (doesExist(file, targetDirFiles) && await isDir(targetPath)) {
                await syncFiles(sourcePath, targetPath);    
            } else if (!doesExist(file, targetDirFiles)) {
                await fsAsync.mkdir(targetPath, {recursive: true});
                await syncFiles(sourcePath, targetPath);
            }
        } 
    });
}

async function start () {
    const sourceDir = path.join('.', 'source');
    const tragetDir = path.join('.', 'target');

    await syncFiles(sourceDir, tragetDir);
}

module.exports = {
    start
};