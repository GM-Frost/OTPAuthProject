import { useEffect, useState } from "react";

import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { resetPasswordValidate } from "../helper/Validate";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";

import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";

import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";

interface IResetProps {}

const Reset: React.FC<IResetProps> = () => {
  const { username } = useAuthStore((state) => state.auth);

  const [showCondition, setShowCondition] = useState(false);
  //Validate the condition of passwords
  const [passwordConditions, setPassowrdConditions] = useState({
    noSpace: false,
    containsSpecialChar: false,
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  const navigate = useNavigate();

  const [{ isLoading, status, serverError }] = useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Resetting password...",
        success: "Password reset successfully",
        error: "Error resetting password",
      });

      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setShowCondition(true);
    const password = e.target.value;

    setPassowrdConditions({
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

  const location = useLocation();
  const otpVerified = location.state?.otpVerified;

  useEffect(() => {
    if (otpVerified) {
      toast.success("OTP verified successfully");
    }
  }, [otpVerified]);

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;

  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  if (status && status !== 201) {
    // eslint-disable-next-line
    navigate("/password");
    return null;
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter your password
            </span>
          </div>

          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                onChange={handlePasswordChange}
                className={styles.textbox}
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="password"
                placeholder="Confirm Password"
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
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
