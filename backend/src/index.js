import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './lib/db.js';
//Router Imports
import authRouter from './routes/auth.routes.js';
import bookRouter from './routes/book.routes.js';

const app = express();
dotenv.config();

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth',authRouter);
app.use('/api/books',bookRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});