import MongoClass from "../mongoClass.js";
import { productosSchema } from "../../MongoSchemas/ProductosSchema.js"

export class MongoDBProducts extends MongoClass {
    constructor() {
        super('products', productosSchema);
    }
}