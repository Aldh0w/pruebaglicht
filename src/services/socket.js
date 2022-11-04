const socketIo = require('socket.io');
const { ProductsController } = require('../controller/productos');
const { MensajesController } = require('../controller/messajes');

let io;

const initWsServer = (server) => {
    io = socketIo(server);
    io.on('connection', async (socket) => {
        console.log('Nueva Conexion establecida!');
        
        
        data = await ProductsController.getAll();
        socket.emit('Server:TodosLosProductos', data) 
        
        socket.on('Cliente:nuevoProducto', async (data) =>{
            await ProductsController.save(data);
            console.log('Se agrego un producto nuevo al servidor de nombre ',data.title);
        });


        obtenerMensajes = await MensajesController.getAll();
        socket.emit('Server:TodosLosMensajes', obtenerMensajes)

        socket.on('Cliente:chatmessage',async (data)=>{
            await MensajesController.save(data);
        })
                
    });

    return io;
}

const getWsServer = () => {
    return io;
}


module.exports = {
    initWsServer,
    getWsServer
};