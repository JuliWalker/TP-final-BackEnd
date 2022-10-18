import mongoose from "mongoose";

export const carritosSchema = new mongoose.Schema({
  direccion: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  productos: [
    {
      _id: {
        type: String,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      descripcion: {
        type: String,
      },
      codigo: {
        type: String,
        required: true,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: false,
      },
      cantidad: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});
