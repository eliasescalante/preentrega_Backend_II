//Por el momento este archivo esta en desuso

const fs = require('fs');
const path = require('path');

function readJsonFile(filePath) {
    //Funcion para leer el contenido de los archivos
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        throw error;
    }
}

function writeJsonFile(filePath, data) {
    //Funcion para escribir el contenido de los archivos
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error.message);
        throw error;
    }
}

function generateNewId(items) {
    //Funcion para generar un nuevo id
    return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    generateNewId
};
