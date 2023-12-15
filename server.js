import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

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

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
// only when ready to deploy
//app.use(express.static(path.resolve(__dirname, './client/build')));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// only when ready to deploy
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

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
