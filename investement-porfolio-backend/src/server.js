const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investments');
const stockRoutes = require('./routes/stocks');
require('dotenv').config();

const app = express();

// Middlewre
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api', stockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})