import MongoClass from "../mongoClass.js";
import { carritosSchema } from "../../MongoSchemas/CarritosSchema.js";

export class MongoDBCarritos extends MongoClass {
  constructor() {
    super("carritos", carritosSchema);
  }

  async update(id, doc, email, adress) {
    try {
      const newCart = { productos: [], email: email, direccion: adress }
      for (let i = 0; i < doc.length; i++) {
        newCart.productos.push(doc[i])
      }
      const updatedDoc = await this.collection.findByIdAndUpdate(id, newCart).exec();
      return updatedDoc;
    } catch (err) {
      throw new Error(err);
    }
  }
}
