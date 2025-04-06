require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require("express-session");
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use(express.json());


app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));


// Routes
app.use(clientRoutes);
app.use('/admin', adminRoutes);
app.use(apiRoutes);

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
