import { MongoDBUsers } from '../persistencia/daos/users/usersDao.js'

export default class UsersServices{
    constructor(){
        this.UsersDao = new MongoDBUsers()
    }

    async getAll(){
        try {
            const all = await this.UsersDao.getAll()
            return all
        }
        catch (error) {
            throw new Error("error: ",error)
        }
    }

    async getOne(id) {
        try{
            const one = await this.UsersDao.getOne(id)
            return one
        }catch(err){
            throw new Error(err)
        }
    }

    async saveNew(obj){
        try {
            const newProduct = await this.UsersDao.saveNew(obj)
            return newProduct
        }
        catch (error) {
            throw new Error("error: ",error)
        }
    }

    async update(id, doc) {
        try{
            const updatedDoc = await this.UsersDao.update(id, doc)
            return updatedDoc
        }catch(err){
            throw new Error(err)
        }
    }

    async delete(id) {
        try{
            const deletedDoc = await this.UsersDao.elete(id)
            return deletedDoc
        }catch(err){
            throw new Error(err)
        }
    }

    async getByName(name) {
        try{
            const user = await this.UsersDao.getByName(name)
            return user
        }catch(err){
            throw new Error(err)
        }
    }

    async getByMail(mail) {
        try{
            const user = await this.UsersDao.getByMail(mail)
            return user
        }catch(err){
            throw new Error(err)
        }
    }

}