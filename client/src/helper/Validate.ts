import toast from "react-hot-toast";

/** Validate login page username */
export async function usernameValidate(values: { username: string }) {
  const errors = usernameVerify({}, values);
  return errors;
}

interface ErrorType {
  username?: string;
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
