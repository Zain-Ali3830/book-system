import express from 'express';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
import router from './src/routes/books.routes.js';


app.use("/api/books", router);

export default app;