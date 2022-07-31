import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';

import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome'
    });
});

app.get('/api/v1', (req, res) => {
    res.json({
        msg: 'API works!'
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


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