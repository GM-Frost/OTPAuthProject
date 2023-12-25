import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { passwordValidate } from "../helper/Validate";
import { verifyPassword } from "../helper/helper";

import useFetch from "../hooks/fetch.hook";

import { useAuthStore } from "../store/store";

export default function Password() {
  const { username } = useAuthStore((state) => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Verifying...",
        success: <b>Verified Successfully !!!</b>,
        error: <b>Password did not match</b>,
      });

      loginPromise.then((res) => {
        let { token } = res?.data || {};
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;

  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || apiData?.username}!
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={`${
                  apiData?.profile ||
                  "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                }`}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />

              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Sign in
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password ?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
