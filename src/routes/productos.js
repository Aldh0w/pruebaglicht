const {Router} = require('express');
const { ProductsController } = require('../controller/productos');

const rutaProducto = Router();

rutaProducto.get('/', async (req, res)=>{
  // res.render('form')
});

rutaProducto.get('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params 

        const prodPorId = await ProductsController.getById(id)
        res.json({
            msg: prodPorId
        })
    }catch(err){
        next(err);
    }    
 });

rutaProducto.post('/', async (req, res, next)=>{
   /* try{
        const obj = req.body
        await ProductsController.save(obj)
        res.redirect('/')
    }catch(err){
        next(err);
    } */
});

rutaProducto.put('/:id', async (req, res, next) =>{
    const {id} = req.params
    const body = req.body
    try {
        let data = await ProductsController.updateById(id, body)

        res.json(data);

    } catch (err) {
        next(err);
    }
});


rutaProducto.delete('/:id', async (req, res, next) =>{
    try {
        const {id} = req.params
        await ProductsController.deleteById(id)

        res.json({ message: 'Producto eliminado' })

    } catch (err) {
        next(err)
    }
})

module.exports = rutaProducto;