const apiRouter = require("express").Router();
const chatRouter = require("./chat.router");

apiRouter.use("/chat", chatRouter);

module.exports = apiRouter;
