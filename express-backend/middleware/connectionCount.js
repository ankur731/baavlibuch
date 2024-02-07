
const mongoose = require("mongoose");
const CountModel = require("../model/connection");

let connectionCount = 0;
const connectionCountMiddleware = (req, res, next) => {
    connectionCount++;
    CountModel.create({ count: connectionCount });
  next();
};
  

module.exports = connectionCountMiddleware