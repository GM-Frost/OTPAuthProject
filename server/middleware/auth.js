import jwt from "jsonwebtoken";
import ENV from "../config.js";

/** Authentication Middleware */
export default async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    // extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Missing Bearer token" });
    }

    // retrieve the user details of the logged-in users
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication Failed" });
  }
}
