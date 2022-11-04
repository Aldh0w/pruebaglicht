const fs = require('fs');
const path = require('path');

class ProductsApi {
  
    async obtenerJson(){
        const viewsFolderPath = path.resolve(__dirname, '../../productos.json')
        const data = await fs.promises.readFile(viewsFolderPath,'utf-8');
        return JSON.parse(data);
    }
    async actualizarArchivo(productos){
        fs.promises.writeFile('./productos.json', JSON.stringify(productos, null, '\t'), 'utf-8');
    }
    async getAll() {
        const data =  await this.obtenerJson();
        return data;
    };

    async exist(id){
        const data = await this.obtenerJson();

        const indice = data.findIndex(aProduct => aProduct.id == id)

        return indice >= 0;
    }
    async save(data){
        if(!data.title || !data.price|| !data.img) throw new Error('Datos invalidos');
        let id;
        const productos =   await this.obtenerJson();
       if(productos.length){
          id = productos[productos.length -1].id +1;
       }
        const nuevoProducto = {
            id: id,
            title: data.title,
            price: parseInt(data.price),
            img: data.img
        }
        productos.push(nuevoProducto);
        console.log(`se agrego ${nuevoProducto.title} a la lista de productos`);
        this.actualizarArchivo(productos)
        return productos
    }

    async updateById(id, updateProduct) {
		const exist = await this.exist(id);
		if (!exist) throw new Error(`No existe item con ID ${id}`)

		const productos = await this.getAll()
		const productoId = productos.findIndex(producto => producto.id == id)
        if(!updateProduct.title || !updateProduct.price || !updateProduct.img) throw new Error('Datos invalidos');
		const productoViejo = productos[productoId]

		const productoModificado = {
			id: productoViejo.id,
			title: updateProduct.title,
			price: updateProduct.price,
            img: updateProduct.img
		}

		productos.splice(productoId, 1, productoModificado)

		await this.actualizarArchivo(productos)
		return productoModificado

	}

    async getById(id){
        const productos = await this.obtenerJson();
        const busqueda  = productos.find((dato) => dato.id == id);
        if (!busqueda) throw new Error("No existe ese producto");
        return busqueda;
    }
    async deleteById(id){
        const productos = await this.obtenerJson();
        productos.splice(id - 1,1);
        console.log(`Se removio el producto con id:${id} de sus productos`);
        return await this.actualizarArchivo(productos);
    }
    async deleteAll(){
        const productos = await this.obtenerJson();
        productos.splice(0);
        console.log('Se borraron todos los productos de su lista');
        return await this.actualizarArchivo(productos);
    }
}
const instanciaProductsApi = new ProductsApi();

module.exports = {
    ProductsController : instanciaProductsApi
}