import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/books';


// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbooks`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


// Fetch a single book by ID
export const fetchBookById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getbook/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};


// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addbook`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};



// Update an existing book
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updatebook/${id}`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};



// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deletebook/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};