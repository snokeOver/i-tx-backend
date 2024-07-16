const errorHandler = (err, res) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Error Message:", err.message, "and Status code:", status);
  res.status(status).send({
    success: false,
    status,
    message,
  });
};

export default errorHandler;
