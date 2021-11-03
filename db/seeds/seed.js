const db = require("../connection");
const format = require("pg-format");

const seed = (data) => {
  const { userData, chatData, messageData } = data;
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS chats;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS messages;`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR NOT NULL,
      avatar_url VARCHAR
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE chats (
      chat_id SERIAL PRIMARY KEY,
      chat_title VARCHAR NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by INT REFERENCES users(user_id),
      img_url VARCHAR 
    );`);
    })
    .then(() => {
      return db.query(`
    CREATE TABLE messages (
      message_id SERIAL PRIMARY KEY,
      message_body VARCHAR NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      sent_by INT REFERENCES users(user_id),
      posted_in INT REFERENCES chats(chat_id)
    );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users (username, avatar_url)
      VALUES
      %L
      RETURNING *;`,
        userData.map((user) => [user.username, user.avatar_url])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO chats (chat_title, created_at, created_by, img_url)
      VALUES
      %L
      RETURNING *;`,
        chatData.map((chat) => [
          chat.chat_title,
          chat.created_at,
          chat.created_by,
          chat.img_url,
        ])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO messages (message_body, created_at, sent_by, posted_in)
      VALUES
      %L
      RETURNING *;`,
        messageData.map((message) => [
          message.message_body,
          message.created_at,
          message.sent_by,
          message.posted_in,
        ])
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
