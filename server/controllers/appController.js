import { resolve } from "path";
import UserModel from "../model/User.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ENV from "../config.js";

/** ----------- Middleware VERIFY USER ------- */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    //check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "User not found" });
    next(); //go to next controller
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

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
    return res.status(500).send({ error: "Registration failed" });
  }
}

/** POST: http://localhost:8080/api/login */
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username }).then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck)
            return res.status(400).send({ error: "Don't have password" });
          const token = jwt.sign(
            {
              userId: user._id,
              username: user.username,
            },
            ENV.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.status(200).send({
            msg: "Login Successful",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          return res.status(400).send({ error: "Password donot match" });
        });
    });
  } catch (error) {
    return res.status(500).send({ error: "Username not Found" });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(400).send({ error: "Invalid Username" });
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User Not Found" });
    }
    //remove password from the user object
    const { password, ...rest } = Object.assign({}, user.toJSON()); //mongoose return unnecessary object so we convert it to json and then remove password from it

    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

/** PUT: http://localhost:8080/api/updateuser */
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;
      // update the data
      const updateResult = await UserModel.findOneAndUpdate(
        { _id: userId },
        body
      );

      if (updateResult) {
        return res.status(200).send({ msg: "Record Updated" });
      } else {
        return res
          .status(404)
          .send({ error: "User not found or no modifications" });
      }
    } else {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
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
