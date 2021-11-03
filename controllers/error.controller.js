exports.handleErrors = (res, err) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "23502" || err.code === "23503") {
    res
      .status(400)
      .send({ msg: "At least one attribute has an invalid value" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request: invalid input" });
  } else if (err.code === "23505") {
    res.status(400).send({ msg: "Bad Request: duplicate primary key" });
  } else next;
};

exports.methodNotAllowed = (_, res, next) => {
  next({ status: 405, msg: "Method not allowed" });
};
