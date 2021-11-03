const chatRouter = require("express").Router();
const { getChat } = require("../controllers/chat.controller");

chatRouter.get("/", getChat);

module.exports = chatRouter;
