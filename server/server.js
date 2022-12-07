const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// const cors = require("cors");

const cwd = process.cwd();

const PORT = 3001;
// app.use(cors());

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
