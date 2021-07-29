const http = require('http');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const cookieParser = require("cookie-parser");
const config = require('./config/index');
const mongoose = require('./config/mongoose');

const app = express();

mongoose();
app.use(cors({
    origin: ['http://localhost:4200', '.'],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

app.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}...`))