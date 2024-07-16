import errorHandler from "../helper/errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  //   console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log("Received TOken:", token);
    if (!token) {
      // console.log("Token Missing");
      return res.status(401).send({ message: "Forbidden access" });
    } else {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          // console.log("Error at decode:", err);
          return res.status(403).send({ message: "Unauthorized access" });
        }

        req.decoded = decoded;
        next();
      });
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
