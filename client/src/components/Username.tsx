import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { usernameValidate } from "../helper/Validate";

import { useAuthStore } from "../store/store";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function Username() {
  const navigate = useNavigate();

  const setUsername = useAuthStore((state) => state.setUsername);
  const [message, setMessage] = useState<string>("Loading Backend....");
  const [loading, setLoading] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      username: "example123",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://otpauthproject-server.onrender.com/hello"
        );
        const data = await response.json();
        if (data.msg === "Hello There!") {
          setMessage("Backend Fetched");
          setLoading(false);
          toast.success("Backend Fetched");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error Fetching Backend");
        setLoading(false);
        toast.error("Error Fetching Backend");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex text-center justify-center items-center text-indigo-800">
        {loading ? "Starting Render Backend... Please wait for 1 min" : null}
      </div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen flex-col">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us..
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
