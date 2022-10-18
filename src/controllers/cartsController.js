import ProductsServices from "../services/productsServices.js";
import UsersServices from "../services/usersServices.js";
import CartsServices from "../services/cartsServices.js";

export default class CartsController {
  constructor() {
    this.serviceCarts = new CartsServices();
    this.servicesProducts = new ProductsServices();
    this.servicesUser = new UsersServices();
  }

  getCarts = async (req, res) => {
    try {
      const carritos = await this.serviceCarts.getAll();
      carritos
        ? res.status(200).json(carritos)
        : res.status(404).json({ message: "No hay carritos disponibles" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const carrito = await this.serviceCarts.getOne(req.params.id);
      carrito
        ? res.status(200).json(carrito)
        : res
            .status(404)
            .json({ message: "Carrito no encontrado. id: " + req.params.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  saveCart = async (req, res) => {
    try {
      let nuevoCarrito = req.body
      const carritoGuardado = await this.serviceCarts.saveNew(nuevoCarrito);
      res.status(201).json({
        message: "Carrito creado con éxito",
        carrito: carritoGuardado,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  getProductsInCart = async (req, res) => {
    try {
      const carrito = await this.serviceCarts.getOne(req.params.id);
      carrito
        ? res.status(200).json(carrito.productos)
        : res
            .status(404)
            .json({ message: "Carrito no encontrado. id: " + req.params.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const newCart = await this.serviceCarts.addProductsToCart(
        req.params.id,
        req.body
      );
      if (!newCart) {
        res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
      } else {
        res.status(201).json({
          message: "Productos agregados con éxito",
          carrito: newCart,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  };

  deleteProductInCart = async (req, res) => {
    try {
      const { id, productoId } = req.params;
      let response = await this.serviceCarts.deleteProduct(id, productoId);
      console.log(response)
      if (typeof response === "string") {
        res.status(404).json({
          message: "no pudimos eliminar el producto",
          response,
        });
      } else {
        res.status(201).json({
          message: "Productos eliminado con éxito",
          carrito: response,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message, line: err.line });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const carritoBorrado = await this.serviceCarts.deleteCart(req.params.id);
      carritoBorrado
      ? res.status(200).json({ message: "carrito borrado con exito", carritoBorrado })
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

}
