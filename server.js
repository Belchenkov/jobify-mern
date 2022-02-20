import express from 'express';
import dotenv from 'dotenv';

import connectDB from './db/connect.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connect from './db/connect.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
})

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