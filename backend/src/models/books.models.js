import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: String, required: true },
    pages: { type: Number, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);