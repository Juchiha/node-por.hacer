let descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};
let completado = {
    alias: 'c',
    default: true,
    desc: 'marca como completado o no una tarea'
};
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('borrar', 'Borra un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    }).command('listar', 'lista todas las tareas de la aplicacion', {
        completado: {
            alias: 'c',
            desc: 'filtra las tareas'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}