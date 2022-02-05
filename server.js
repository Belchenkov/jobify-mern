import express from 'express';

import notFoundMiddleware from './middleware/not-found.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
})

// Middlewares
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
})