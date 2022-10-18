import { MongoDBProducts } from '../persistencia/daos/products/productsDao.js'

export default class ProductsServices{
    constructor(){
        this.ProductsDao = new MongoDBProducts()
    }

    async getAll(){
        try {
            const all = await this.ProductsDao.getAll({})
            return all
        }
        catch (error) {
            throw new Error("error: ",error)
        }
    }

    async getOne(id) {
        try{
            const one = await this.ProductsDao.getOne(id)
            return one
        }catch(err){
            throw new Error(err)
        }
    }

    async saveNew(obj){
        try {
            const newProduct = await this.ProductsDao.saveNew(obj)
            return newProduct
        }
        catch (error) {
            throw new Error("error: ",error)
        }
    }

    async update(id, doc) {
        try{
            const updatedDoc = await this.ProductsDao.update(id, doc)
            return updatedDoc
        }catch(err){
            throw new Error(err)
        }
    }

    async delete(id) {
        try{
            const deletedDoc = await this.ProductsDao.delete(id)
            return deletedDoc
        }catch(err){
            throw new Error(err)
        }
    }

}