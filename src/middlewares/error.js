const errorMiddleware = (err, req, res, next) => {
  console.log("This is Error ", err);

  res.status(500).json({ msg: err.msg });
};

module.exports = errorMiddleware;