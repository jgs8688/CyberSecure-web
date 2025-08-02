import { useState } from "react";
import banner from "../assets/banner_bg.png";
import google from "../assets/google.png";
import lbanner from "../assets/login_banner.png";
import logo from "../../public/assets/Logo.svg";
import eye from "../assets/eye.png";
import { axiosInstance } from "../utility/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [userdata, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [otp, setOtp] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handlesignup = async () => {
    if (userdata.username.trim() === "") {
      toast.error("Please enter a username");
      return;
    }
    if (userdata.email.trim() === "") {
      toast.error("Please enter an email");
      return;
    }
    if (!emailVerified) {
      toast.error("Please verify your email");
      return;
    }

    if (userdata.password.trim() === "") {
      toast.error("Please enter a password");
      return;
    }
    if (!passwordRegex.test(userdata.password)) {
      toast.error(
        `Password must be at least 8 characters long
         and contain at least one letter and one number`
      );
      return;
    }
    if (!agree) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      const res = await axiosInstance.post("/user/signup", userdata);
      // console.log("The resoonse is: " + JSON.stringify(res));
      if (res.status === 201) {
        toast.success("Sign up successful");
        setUserData({ username: "", email: "", password: "" });
        // Redirect to sign in page
        navigate("/signin");
      } else if (res.status === 400) {
        toast.error("User already exists");
      } else {
        toast.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred while signing up.");
    }

    console.log(userdata);
  };

  // email verification
  const verifyEmail = async (e: any) => {
    e.preventDefault();

    if (userdata.username.trim() === "") {
      toast.error("Please enter a username");
      return;
    }

    const email = userdata.email;
    if (email.trim() === "") {
      toast.error("Please enter an email");

      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setOtp(true);
      const res = await axiosInstance.post("/mail/otp-send", { email });
      console.log(res);
      if (res.status === 200) {
        toast.success("Email sent successfully");
        setEmailVerified(true);
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("An error occurred while verifying the email.");
    }

    console.log(email);
  };

  // OTP verification

  const verifyOtp = async (otp: string) => {
    try {
      const res = await axiosInstance.post("/mail/verify-otp", { otp });
      console.log(res);

      switch (res.status) {
        case 200:
          setOtp(false);
          setEmailVerified(true);
          toast.success("OTP verified successfully");

          break;
        case 400:
          toast.error("Invalid OTP");
          break;
        case 500:
          toast.error("Server error");
          break;
        default:
          toast.error("An unknown error occurred");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred while verifying the OTP.");
    }
  };

  // google signup
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google"; // replace with your backend
  };
  // min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 px-4

  return (
    <div className="flex items-center justify-center bg-[#0f1115] min-h-screen md:flex-row flex-col-reverse shadow-lg">
      {/* Left Side - Banner */}
      <div className="relative w-full md:w-[500px]">
        <img
          src={banner}
          alt="banner"
          className="md:w-full  md:rounded-tl-3xl rounded-bl-3xl rounded-br-3xl md:rounded-bl-none md:rounded-br-none shadow-lg relative z-0"
        />
        <img
          src={lbanner}
          alt="banner logo"
          className="absolute bottom-20 p-5 md:p-10 left-0 z-10"
        />
        <div className="p-3 md:p-0">
          <img
            src={logo}
            alt="logo"
            className="absolute top-0 p-5 pl-12 md:p-10 left-10 z-10  "
          />
          <h1 className="absolute top-3 p-5 md:p-10 right-10 md:right-28 z-10 text-3xl md:text-4xl  pr-10 text-white font-bold">
            WebSure
          </h1>
        </div>
        <div className="">
          <h1 className=" hidden md:block font-semibold text-white text-lg md:text-xl p-10 md:p-20 absolute bottom-2 left-5 md:left-9">
            Online Community For Secure
          </h1>
          <p className="text-[#f5f5f571] absolute left-5 md:left-9 bottom-6  md:bottom-0 text-sm md:text-base pr-5 md:pr-0  pb-2">
            "Security is not a luxury anymore — it's a necessity. Make your
            websites stronger with our free, powerful vulnerability scanner"
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col pt-10 md:pt-20 justify-center w-full md:w-[500px] bg-white shadow-lg px-6 md:px-10 md:rounded-br-2xl">
        <h1 className="font-bold text-center  md:text-2xl text-3xl">
          Join & Connect with WebSure
        </h1>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center cursor-pointer mb-6 justify-center gap-2 h-12 mt-4 text-white bg-[#FAFAFA] rounded-4xl hover:bg-blue-100"
        >
          <img src={google} alt="" className="w-6 md:w-8" />
          <span className="text-gray-500 text-sm md:text-base">
            Sign up with Google
          </span>
        </button>

        <form>
          <label className="ml-2 text-sm md:text-base">Username</label>
          <input
            type="text"
            className="w-full h-12 mb-6 outline-0 border-b-2 border-[#BDBDBD]"
            placeholder="Enter your username"
            required
            onChange={(event) =>
              setUserData({ ...userdata, username: event.target.value })
            }
          />

          <div className="flex justify-between items-center">
            <label className="ml-2 text-sm md:text-base">Email</label>
            <button
              className="text-blue-500 text-sm md:text-base cursor-pointer"
              onClick={verifyEmail}
            >
              {otp ? "Resend OTP" : "Verify Email"}
            </button>
          </div>
          <input
            type="email"
            className="w-full h-12 mb-6 outline-0 border-b-2 border-[#BDBDBD]"
            placeholder="Enter your email"
            required
            onChange={(event) =>
              setUserData({ ...userdata, email: event.target.value })
            }
          />

          <div>
            {otp && (
              <div>
                {" "}
                <label className="ml-2 text-sm md:text-base text-red-400">
                  OTP
                </label>
                <input
                  type="text"
                  className="w-full h-12 mb-6  border-[#BDBDBD] outline-0 border-b-2"
                  required
                  maxLength={6}
                  onChange={(event) => {
                    if (event.target.value.length === 6) {
                      const otp = event.target.value;
                      console.log(event.target.value);
                      verifyOtp(otp);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {!otp && (
              <>
                <div className="flex justify-between items-center">
                  <label className="ml-2 text-sm md:text-base">Password</label>
                  <img
                    src={eye}
                    alt=""
                    onClick={() => setVisible(!visible)}
                    className="cursor-pointer"
                  />
                </div>

                <input
                  type={visible ? "text" : "password"}
                  className="w-full h-12 mb-6 outline-0 border-b-2 border-[#BDBDBD]"
                  placeholder="Enter your password"
                  onChange={(event) =>
                    setUserData({ ...userdata, password: event.target.value })
                  }
                />
              </>
            )}
          </div>
        </form>

        <div className="flex items-center justify-center text-sm md:text-base">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="cursor-pointer"
            required
          />
          <label className="ml-2">I agree to the terms and conditions</label>
        </div>

        <button
          className="w-full h-12 mt-4 text-white cursor-pointer bg-[#3F51B5] rounded-4xl hover:bg-blue-100"
          onClick={handlesignup}
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm md:text-base">
          Own an Account?
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => navigate("/signin")}
          >
            JUMP RIGHT IN
          </span>
        </p>
      </div>
    </div>
  );
}
