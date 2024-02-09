import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDb from './config/dbConfig';
import shortUrl from './routes/shortUrl'
import cors from 'cors';


dotenv.config();
connectDb();

const port = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))

app.get("/", (req, res) => {
    res.json('hello world')
});
app.use('/api/', shortUrl);
app.listen(port, () => {
    console.log(`server started on ${port}`)
});