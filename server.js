import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
})

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is listening on http://127.0.0.1:${PORT}`);
})