import mongoose from "mongoose";

export const usuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    default: "",
  },
});
