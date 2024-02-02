
const fsAsync = require('fs/promises');
const path = require('path');
const logger = require('./utils/logger')('main');

function doesExist(item, arr) {
    return arr.includes(item);
}

async function isDir(path) {
    try {
        const stat = await fsAsync.stat(path);
        return stat.isDirectory();
    } catch (error) {
        logger.error(`Error checking if ${path} is a directory: ${error.message}`);
    }
}

async function syncFiles(sourceDir, tragetDir) {
    try{
        const sourceDirFiles = await fsAsync.readdir(sourceDir);
        const targetDirFiles = await fsAsync.readdir(tragetDir);
    
        sourceDirFiles.forEach(async (file) => {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(tragetDir, file);
    
            if (!await isDir(sourcePath)) {
                if(!doesExist(file, targetDirFiles)) {
                    try {
                        fsAsync.copyFile(sourcePath, targetPath);
                    } catch (error) {
                        logger.error(`Error copying file from ${sourcePath} to ${targetPath}: ${error.message}`);
                    }
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

    } catch (error) {
        logger.error(`Error syncing files: ${error.message}`);
    }
}

async function start () {
    const sourceDir = path.join('.', 'source');
    const tragetDir = path.join('.', 'target');
    await syncFiles(sourceDir, tragetDir);
}

module.exports = {
    start
};