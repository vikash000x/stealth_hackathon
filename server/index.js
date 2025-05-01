// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', searchRoutes);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (_ , res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})



app.listen(5000, () => console.log("Server running on port 5000"));












