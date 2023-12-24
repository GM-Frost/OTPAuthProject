import { useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { useEffect, useState } from "react";
import { generateOTP, verifyOTP } from "../helper/helper";

export default function Recovery() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);

  const [OTP, setOTP] = useState();
  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) toast.success("OTP sent to your email address");
      else toast.error("Error sending OTP");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        return navigate("/reset", { state: { otpVerified: true } });
      }
    } catch (error) {
      return toast.error("Invalid OTP. Check your OTP in your email");
    }
  }

  // HANDLER FUNCTION OF RESEND BUTTON

  function resendOTP() {
    let sendPromise = generateOTP(username);
    toast.promise(sendPromise, {
      loading: "Sending OTP...",
      success: "OTP sent successfully",
      error: "Error sending OTP",
    });
    sendPromise.then((OTP) => {
      console.log(OTP);
    });
  }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="py-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <span className="py-4 text-sm text-left text-gray-500">
                Enter 6 digit OTP sent to your email address
              </span>
              <input
                onChange={(e) => setOTP(e.target.value)}
                className={styles.textbox}
                type="text"
                placeholder="OTP"
              />

              <button className={`${styles.btn} bg-indigo-500`} type="submit">
                Recover
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP ?{" "}
              <button className="text-red-500" onClick={resendOTP}>
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
