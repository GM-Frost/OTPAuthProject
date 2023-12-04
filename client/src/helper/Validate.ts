import toast from "react-hot-toast";

/** Validate login page username */
export async function usernameValidate(values: { username: string }) {
  const errors = usernameVerify({}, values);
  return errors;
}
/** Validate password */
export async function passwordValidate(values: { password: string }) {
  const errors = passwordVerify({}, values);
  return errors;
}

/** Validate password */
function passwordVerify(error: ErrorType = {}, values: { password: string }) {
  //Special Characters
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password is required");
    return error;
  }

  if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password");
    return error;
  }

  if (values.password.length < 4) {
    error.password = toast.error("Password must be at least 4 characters");
    return error;
  }

  if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must contain special characters");
    return error;
  }

  if (!/[A-Z]/.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one uppercase letter"
    );
    return error;
  }

  if (!/[a-z]/.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one lowercase letter"
    );
    return error;
  }

  if (!/\d/.test(values.password)) {
    error.password = toast.error("Password must contain at least one number");
    return error;
  }

  return error;
}

interface ErrorType {
  username?: string;
  password?: string | number;
  exist?: string;
}

/** Validate Reset Password */

export async function resetPasswordValidate(values: {
  password: string;
  confirm_pwd: string;
}) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password and Confirm Password must be same");
  }
  return errors;
}

/** Validate User form */
function usernameVerify(error: ErrorType = {}, values: { username: string }) {
  if (!values.username) {
    error.username = toast.error("Username is required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}
