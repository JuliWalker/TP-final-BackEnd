import { MongoDBCarritos } from "../persistencia/daos/carts/mongoDBCarts.js";

export default class CartsServices {
  constructor() {
    this.CartsDao = new MongoDBCarritos();
  }

  async getAll() {
    try {
      const all = await this.CartsDao.getAll({});
      return all;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async getOne(id) {
    try {
      const one = await this.CartsDao.getOne(id);
      return one;
    } catch (err) {
      throw new Error(err);
    }
  }

  async saveNew(obj) {
    try {
      // el obj que me llega aca tiene que tener el parametro cantidad y no tener el stock. Eso asumo que viene con formato correcto por logica del front?
      const newCart = await this.CartsDao.saveNew(obj);
      return newCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async addProductsToCart(id, product) {
    // para hacerlo mas simple voy a asumir que solo se puede agregar un producto a la vez (eso depende de las necesidades de la app, pero vamos con esa que es mas facil)
    try {
      const one = await this.CartsDao.getOne(id);
      if (one) {
        const i = one.productos.findIndex((prod) => prod.id == product._id);
        if (i >= 0) {
          one.productos[i].cantidad =
            one.productos[i].cantidad + product.cantidad;       
        } else {
          one.productos.push(product);
        }
        const newCart = await this.CartsDao.update(id, one.productos, one.email, one.direccion);
        return newCart;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteProduct(id, productId) {
    try {
      const one = await this.CartsDao.getOne(id);
      if (one) {
        const i = one.productos.findIndex((prod) => prod.id == productId);
        if (i >= 0) {
          one.productos.splice(i, 1);
          const newCart = await this.CartsDao.update(id, one.productos, one.email, one.direccion);
          return newCart;
        } else {
          const message = "No se pudo encontrar el producto a eliminar dentro del carrito";
          return message;
        }
      } else {
        const message = "No se pudo encontrar encontrar el carrito con el ID indicado";
        return message;
      }
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

  async deleteCart(id) {
    try {
      const deletedCart = await this.CartsDao.delete(id);
      return deletedCart;
    } catch (error) {
      throw new Error("error: ", error);
    }
  }

}
