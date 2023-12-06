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
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    //check if user already exists
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username: username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });
        resolve();
      });
    });

    //check if email already exists
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email: email }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique Email" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username: username,
                password: hashedPassword,
                profile: profile || "",
                email: email,
              });
              //return and save the result as a response
              user
                .save()
                .then((result) => {
                  res
                    .status(201)
                    .send({ msg: "User created successfully", result });
                })
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({ error: "Unable to hash password" });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login
 * @params: {
 * "username": "test",
 * "password": "test",
 */
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
