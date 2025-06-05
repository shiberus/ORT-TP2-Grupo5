// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import conectarDB from "./config/db.js";
import "./models/index.js"

dotenv.config();

conectarDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
