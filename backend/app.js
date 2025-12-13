import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({origin:"http://localhost:5173"}));

app.use(express.json());
import router from './src/routes/books.routes.js';


app.use("/api/books", router);

export default app;