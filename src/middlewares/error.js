const errorMiddleware = (err, req, res, next) => {
  console.log("This is Error ", err);

  res.status(err.statusCode || 500).json({ msg: err.msg,field: err.field });
};

module.exports = errorMiddleware;