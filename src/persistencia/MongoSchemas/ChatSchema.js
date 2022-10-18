import mongoose from "mongoose";

export const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
});