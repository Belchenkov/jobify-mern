import express from 'express';
import dotenv from 'dotenv';

import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
});

// Routes
app.use('/api/v1/auth', authRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(express.json());

const PORT = process.env.PORT || 3005;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        app.listen(PORT, () => {
            console.log(`Server is listening on http://127.0.0.1:${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();