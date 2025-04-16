
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require("express-session");
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const path = require('path');
const port = 3001;

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload/drivers', express.static(path.join(__dirname, 'upload/drivers')));

// Routes
app.use(clientRoutes);
app.use('/admin', adminRoutes);
app.use(apiRoutes);

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
