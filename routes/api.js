const express = require('express');
const routes = express.Router();

const carRoutes = require("./api/carsdb");

routes.use('/car', carRoutes);

module.exports = routes;