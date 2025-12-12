import express from "express";
import { Book } from "../models/books.models.js";



// Create a new book
export const createBookController = async(req, res)=> {
    try {
        const { title, author, publishedDate, pages, genre, price } = req.body;
        const newBook = new Book({ title, author, publishedDate, pages, genre, price });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all books
export const getAllBooksController = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get a book by Name
export const getBookByIdController = async(req, res) => {
   try {
    const {name}=req.body;
    const book=await Book.findOne({name});
    res.status(200).json(book);
   } catch (error) {
    res.status(500).json({ message: error.message });
   }}


// Update a book by Name
export const updateBookController = async(req, res) => {
    try {
        const {name}=req.body;
        const updatedData=req.body;
        const book=await Book.findOneAndUpdate({name},updatedData,{returnDocument:"after"});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Delete a book by Name
export const deleteBookController = async(req, res) => {
    try {
        const {name}=req.body;
        await Book.findOneAndDelete({name});
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}