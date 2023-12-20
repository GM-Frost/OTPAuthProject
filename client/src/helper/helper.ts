import axios from "axios";

/** SERVER DOMAIN - BASE URL */
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_DOMAIN;

/** Making API Request */

//---------AUTHENTICATION FUNCTION----------------//

export async function authenticate(username: string) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist" };
  }
}

//---------GETTING  USERS DETAILS FUNCTION----------------//

export async function getUserDetails({ username }: any) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

//--------- REGISTER USER FUNCTION ----------------//

export async function registerUser(credentials: any) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);
    let { username, email } = credentials;

    /** Send Email */
    if (status === 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//----------------- LOGIN FUNCTION ----------------//

export async function verifyPassword({ username, password }: any) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesnt match" });
  }
}

//----------------- UPDATE USER FUNCTION ----------------//
export async function updateUser(response: any) {
  try {
    //getting token from user local storage
    const token = await localStorage.getItem("token");

    const data = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Could not update profile!" });
  }
}

//----------------- GENERATE OTP ----------------//

export async function generateOTP(username: string) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    if (status === 201) {
      // Send Email with OTP
      let {
        data: { email },
      } = await getUserDetails({ username });

      let text = `Your Password Recovery OTP is: ${code}. Verify and recover your password.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//----------------- VERIFY OTP ----------------//

export async function verifyOTP({ username, code }: any) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject({ error });
  }
}

//-----------------RESET PASSOWORD ----------------//
export async function resetPassword({ username, password }: any) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
