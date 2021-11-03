const { selectChat } = require("../models/chat.model");

exports.getChat = async (req, res, next) => {
  try {
    const chat = await selectChat();
    res.status(200).send({ chat });
  } catch (err) {
    next(err);
  }
};
