const fs = require('fs');
const { number } = require('yargs');
let listadoPorHacer = [];
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    let guardar = guardarDB();
    return porHacer;
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw err;
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (e) {
        listadoPorHacer = [];
    }
}

const getListado = (c) => {
    cargarDB();
    if (c !== undefined) {
        let nuevoArray = listadoPorHacer.filter(tarea => tarea.completado === c);
        console.log(nuevoArray);
        return nuevoArray;
    } else {
        return listadoPorHacer;
    }

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //Aqui buscamos el index de esa descripcion
    //Si no encuentra nada me retorna el -1
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        //lo encontro
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}