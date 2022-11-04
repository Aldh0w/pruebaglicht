const fs = require('fs');
const path = require('path');
const moment = require('moment');


class MensajesApi {

    async obtenerJson(){
        const viewsFolderPath = path.resolve(__dirname, '../../mensajes.json')
        const data = await fs.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }

    async actualizarArchivo(productos){
        fs.promises.writeFile('./mensajes.json', JSON.stringify(productos, null, '\t'), 'utf-8');
    }

    async getAll() {
        const data =  await this.obtenerJson();
        return data;
    };

    async save(data){
        if(!data.username || !data.message) throw new Error('Datos invalidos');
        const messages =   await this.obtenerJson();
        const nuevoMessage = {
            username: data.username,
            message: data.message,
            time: moment().format('L, h:mm a'),
        }
        messages.push(nuevoMessage);
        this.actualizarArchivo(messages)
        return messages
    }
}

const instanciaMensajesApi = new MensajesApi();

module.exports = {
    MensajesController : instanciaMensajesApi
}