import MongoClass from "../mongoClass.js";
import { usuariosSchema } from "../../MongoSchemas/UsuariosSchema.js"


export class MongoDBUsers extends MongoClass {
    constructor() {
        super('users', usuariosSchema );
    }

    async getByName(name) {
        try{
            const user = await this.collection.findOne( {nombre:name} )
            return user
        }catch(err){
            throw new Error(err)
        }
    }

    async getByMail(mail) {
        try{
            const user = await this.collection.findOne( {email:mail} )
            return user
        }catch(err){
            throw new Error(err)
        }
    }

}