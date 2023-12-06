import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { registerValidate } from "../helper/Validate";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import covertToBase64 from "../helper/ConvertImage";

export default function Register() {
  const [showCondition, setShowCondition] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  //Validate the condition of passwords
  const [passwordConditions, setPassowrdConditions] = useState({
    noSpace: false,
    containsSpecialChar: false,
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
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

  /** FORMIK DOENST SUPPORT FILE UPLOAD - Create this handler */

  const onUpload = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];

      try {
        const base64 = await covertToBase64(file);
        setFile(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-auto min-h-screen ">
        <div className={`${styles.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to on-board you
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={`${
                    file ||
                    "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                  }  `}
                  className={`${styles.profile_img} ${
                    file ? "shadow-gray-400" : "border-gray-100"
                  }`}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="john_doe@gmail.com"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="john_doe"
              />
              <input
                {...formik.getFieldProps("password")}
                onChange={handlePasswordChange}
                className={styles.textbox}
                type="password"
                placeholder="●●●●●"
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
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Registered ?{" "}
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
