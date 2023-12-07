import { resolve } from "path";
import UserModel from "../model/User.model.js";

import bcrypt from "bcrypt";

/** POST: http://localhost:8080/api/register
 * @params: {
 * "username": "test",
 * "password": "test",
 * "firstname": "test",
 * "lastname": "test",
 * "email": "test@gmail.com",
 * "mobile": "1234567890",
 * "address": "test address",
 * "profile":""}
 */

/** POST: http://localhost:8080/api/login
 * @params: {
 * "username": "test",
 * "password": "test",
 */

export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check existing user
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).send({ error: "Please use a unique username" });
    }

    // Check existing email
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ error: "Please use a unique email" });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });

      await newUser.save();
      return res.status(201).send({ msg: "User Registered Successfully" });
    }
  } catch (error) {
    // Log the detailed error for debugging purposes
    console.error("Error during registration:", error);
    return res.status(500).send({ error: "Registration failed" });
  }
}

export async function login(req, res) {
  res.json("login routesss");
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.json("getUser route");
}

/** PUT: http://localhost:8080/api/updateuser */
export async function updateUser(req, res) {
  res.json("update User route");
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  res.json("update User route");
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  res.json("update User route");
}

/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  res.json("update User route");
}

/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  res.json("update User route");
}
