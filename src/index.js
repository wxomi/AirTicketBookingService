const express = require("express");
const app = express();

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server Started on Port:  ${PORT}`);

    if (DB_SYNC) {
      db.Sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
