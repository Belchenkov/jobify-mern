import { readFile } from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();
import connectDB from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        await Job.deleteMany();

        const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)));

        await Job.create(jsonProducts);

        console.info('Success import mock data...');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();