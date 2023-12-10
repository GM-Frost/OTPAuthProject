import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import Auth, { localVariable } from "../middleware/auth.js";

import { registerMail } from "../controllers/mailer.js";

/**------------------ POST METHOD ------------------ **/
router.route("/register").post(controller.register);

//send email
router.route("/registerMail").post(registerMail);

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
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariable, controller.generateOTP);

// verify generated OTP
router.route("/verifyOTP").get(controller.verifyOTP);

// reset all variables
router.route("/createResetSession").get(controller.createResetSession);

/**------------------ PUT METHOD ------------------ **/

// is use to update the user profile
router.route("/updateuser").put(Auth, controller.updateUser);

// is use to reset password
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword);

export default router;
