import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
connectDB();

// Routes
app.use('', userRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
