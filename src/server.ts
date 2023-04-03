import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes will be added here
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/permanconn-backend-zest', routes);

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);

        console.log('Connected to MongoDB');

        app.listen(3001, () => {
            console.log('Server is running on http://localhost:3001');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
startServer();
