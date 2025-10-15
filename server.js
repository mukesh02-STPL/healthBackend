require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');
const cors = require("cors");

const userRoutes = require('./routes/userRoutes');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
