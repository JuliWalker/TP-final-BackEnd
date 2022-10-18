import mongoose from "mongoose";

export const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
    },
    codigo: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
});