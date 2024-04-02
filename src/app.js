const express = require('express');
const dotenv = require('dotenv');
const ip = require('ip');
const router = require('./service');

dotenv.config();

const ip_address = ip.address();
const app = express();

app.use(express.json());
app.use(router);

const protocol = process.env.PROTOCOL;
const port = process.env.PORT;

app.listen(port, () => console.log(`Server started in http://localhost:${port} or ${protocol}://${ip_address}:${port}`));
