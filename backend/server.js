const express = require('express')
const router = express.Router();
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const homewokRoutes = require('./routes/homeworkRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const cors = require('cors');


dotenv.config();

// connect to database
connectDB();

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? [process.env.FRONTEND_URL, process.env.FRONTEND_URL.replace(/\/$/, '')] : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/homework', homewokRoutes);
app.use('/api/notifications', notificationRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});