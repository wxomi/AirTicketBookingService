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
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();

//Todo Implementing Rabbitmq such that whenever someone creates a booking it will get message that ticket s'been created and working reminder also
//Todo Also do isverified Check Everywhere
