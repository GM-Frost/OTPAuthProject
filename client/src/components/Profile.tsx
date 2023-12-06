import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";

import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { profileValidate } from "../helper/Validate";

import covertToBase64 from "../helper/ConvertImage";

export default function Profile() {
  const [file, setFile] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

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
    <div className="container mx-auto ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-auto min-h-screen">
        <div className={`${styles.glass} ${extend.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you
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
                  className={`${styles.profile_img}  ${extend.profile_img} ${
                    file ? "shadow-gray-400" : "border-gray-100"
                  } `}
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
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex w-full md:w-1/2 mb-4 md:mb-0 justify-center items-center">
                  <input
                    {...formik.getFieldProps("firstname")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="flex w-full md:w-1/2 justify-center items-center">
                  <input
                    {...formik.getFieldProps("lastname")}
                    className={`${styles.textbox} ${extend.textbox} `}
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex w-full md:w-1/2 mb-4 md:mb-0 justify-center items-center">
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    placeholder="+1 (444) 444 4444"
                  />
                </div>
                <div className="flex w-full md:w-1/2 justify-center items-center">
                  <input
                    {...formik.getFieldProps("email")}
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="email"
                    placeholder="john_doe@gmail.com"
                  />
                </div>
              </div>

              <div className="flex w-full mb-4 md:mb-0 justify-center items-center">
                <input
                  {...formik.getFieldProps("address")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="address"
                />
              </div>

              {/* <div className="name flex w-full md:w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="firstname"
                />
                <input
                  {...formik.getFieldProps("lastname")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="lastname"
                />
              </div>
              <div className="name flex w-full md:w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="+1 (444) 444 4444"
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="john_doe@gmail.com"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="address"
              /> */}

              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back Later ?{" "}
                <Link className="text-red-500" to="/">
                  Log out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
