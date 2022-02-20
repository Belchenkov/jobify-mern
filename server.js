import express from 'express';
import dotenv from 'dotenv';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
})

// Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
})