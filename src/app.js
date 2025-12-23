const express = require("express");
const reservationsRoutes = require("./routes/reservations.routes");

const app = express();
app.use(express.json());

app.use("/reservations", reservationsRoutes);

module.exports = app;
