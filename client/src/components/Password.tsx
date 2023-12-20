import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { passwordValidate } from "../helper/Validate";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

import useFetch from "../hooks/fetch.hook";

import { useAuthStore } from "../store/store";

export default function Password() {
  const [showCondition, setShowCondition] = useState(false);
  const { username } = useAuthStore((state) => state.auth);

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);

  //Validate the condition of passwords
  const [passwordConditions, setPasswordConditions] = useState({
    noSpace: false,
    containsSpecialChar: false,
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setShowCondition(true);
    const password = e.target.value;

    setPasswordConditions({
      noSpace: !password.includes(" "),
      containsSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
        password
      ),
      minLength: password.length >= 4,
      hasUpperCase: /[A-Z]+/.test(password),
      hasLowerCase: /[a-z]+/.test(password),
      hasNumber: /[0-9]+/.test(password),
    });
  };

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
                onChange={handlePasswordChange}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <div className={`${showCondition ? "flex text-sm" : "hidden"}`}>
                <div className="bg-gray-200 rounded-md p-4 justify-center items-center">
                  <ul className="flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <span>
                        {passwordConditions.minLength ? (
                          <AiOutlineCheckCircle className="text-green-600 text-lg" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500 text-lg" />
                        )}
                      </span>
                      <p className="text-center">
                        Password is at least 4 characters long.
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="">
                        {passwordConditions.containsSpecialChar ? (
                          <AiOutlineCheckCircle className="text-green-600 text-lg" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500 text-lg" />
                        )}
                      </span>
                      <p className="text-center">Contains special characters</p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="">
                        {passwordConditions.hasUpperCase ? (
                          <AiOutlineCheckCircle className="text-green-600 text-lg" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500 text-lg" />
                        )}
                      </span>
                      <p className="text-center">
                        Password has uppercase letters.
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="">
                        {passwordConditions.hasLowerCase ? (
                          <AiOutlineCheckCircle className="text-green-600 text-lg" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500 text-lg" />
                        )}
                      </span>
                      <p className="text-center">
                        Password has lowercase letters.
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="">
                        {passwordConditions.hasNumber ? (
                          <AiOutlineCheckCircle className="text-green-600 text-lg" />
                        ) : (
                          <AiOutlineCloseCircle className="text-red-500 text-lg" />
                        )}
                      </span>
                      <p className="text-center">Password has a number.</p>
                    </li>
                  </ul>
                </div>
              </div>

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
