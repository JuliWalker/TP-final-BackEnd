import ProductsServices from "../services/productsServices.js";
import UsersServices from "../services/usersServices.js";

export default class ProductsController{
    constructor() {
        this.servicesProducts = new ProductsServices()
        this.servicesUser = new UsersServices()
    }

    getProducts = async(req,res)=>{
        try {       
            const allProducts = await this.servicesProducts.getAll()
            res.status(200).render("home", { nombre: req.session.user.nombre, products: allProducts });
            // si quisieramos trabajar como API REST cambiamos la linea de arriba por: res.send(allProducts)
        } catch (error) {
            res.status(500).send(error)
        }    
    };

    getProductById = async(req,res)=>{
        try{
            const producto = await this.servicesProducts.getOne(req.params.id);
            producto? res.status(200).json(producto) : res.status(404).json({message: 'Producto no encontrado. id: ' + req.params.id});
        }
        catch (err){
            res.status(500).json({message: err.message});
        }  
    };

    saveProduct = async(req,res)=>{
        try {
            const obj = req.body
            const createProduct = await this.servicesProducts.saveNew(obj)
            res.status(200).json(createProduct)
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    };

    updateProduct = async(req,res)=>{
        try{
            const productoActualizado = await this.servicesProducts.update(req.params.id, req.body);
            res.status(200).json({
                message: 'Producto actualizado correctamente',
                id: productoActualizado._id
                });
        }catch (err){
            res.status(500).json({message: err.message});
        }
    };

    deleteProduct = async(req,res)=>{
        try{
            const productoBorrado = await this.servicesProducts.delete(req.params.id);
            res.status(200).json({
                message: 'Producto borrado correctamente',
                id: productoBorrado._id
                });
        }
        catch (err){
            res.status(500).json({message: err.message});
        }
    };

}