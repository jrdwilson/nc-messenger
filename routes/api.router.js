const apiRouter = require("express").Router();
const chatRouter = require("express").Router();

apiRouter.use("/chat", chatRouter);

module.exports = apiRouter;
