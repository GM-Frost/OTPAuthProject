import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";

/**------------------ POST METHOD ------------------ **/
router.route("/register").post(controller.register);

//send email
router.route("/registerMail").post((req, res) => {
  res.json("register route");
});

//authenticate user
router.route("/authenticate").post((req, res) => {
  res.end();
});

//login in app
router.route("/login").post(controller.verifyUser, controller.login); //first verify user then login

/**------------------ GET METHOD ------------------ **/

// user with username
router.route("/user/:username").get(controller.getUser);

// generate random OTP
router.route("/generateOTP").get(controller.generateOTP);

// verify generated OTP
router.route("/verifyOTP").get(controller.verifyOTP);

// reset all variables
router.route("/createResetSession").get(controller.createResetSession);

/**------------------ PUT METHOD ------------------ **/

// is use to update the user profile
router.route("/updateuser").put(controller.updateUser);

// is use to reset password
router.route("/resetPassword").put(controller.resetPassword);

export default router;
