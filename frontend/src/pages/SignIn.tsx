import banner from "../assets/signin_banner.png";
import google from "../assets/google.png";
import lbanner from "../assets/login_banner.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eye from "../assets/eye.png";
import { toast } from "react-toastify";
import { axiosInstance } from "../utility/baseUrl";
import { useAuth } from "../context/Authcontext";

interface UserData {
  email: string;
  password: string;
}

const handleGoogleAuth = () => {
  window.location.href = "http://localhost:5000/auth/google";
};

export default function SignIn() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState<Boolean>(false);
  const { setUser } = useAuth();

  const usenavigate = useNavigate();

  const handleSignIn = async () => {
    console.log("userData", userData);
    if (userData.email === "" || userData.password === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await axiosInstance.post("/user/signin", userData, {
        withCredentials: true,
      });
      console.log("res", res);
      if (res.status === 200) {
        toast.success("Sign in successful");
        setUser(res.data.user.id);
        usenavigate("/dashboard");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 min-h-screen md:flex-row flex-col-reverse shadow-lg">
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
            className="absolute top-0 p-5 pl-12 md:p-10 left-10 z-10"
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
            "Modern cyber attacks don't always break the door — they wait for
            you to open it. Stay ahead with smart scanning."
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col py-10 md:py-30 pt-10 md:pt-20 justify-center w-full md:w-[500px] bg-white shadow-lg px-6 md:px-10 md:rounded-br-2xl">
        <h1 className="font-bold text-center  md:text-2xl text-3xl">
          Welcome back to the WebSure
        </h1>

        <button
          onClick={handleGoogleAuth}
          className="flex items-center cursor-pointer mb-6 justify-center gap-2 h-12 mt-4 text-white bg-[#FAFAFA] rounded-4xl hover:bg-blue-100"
        >
          <img src={google} alt="" className="w-6 md:w-8" />
          <span className="text-gray-500 text-sm md:text-base">
            Sign In with Google
          </span>
        </button>

        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <label className="ml-2 text-sm md:text-base">Email</label>
          </div>
          <input
            type="email"
            className="w-full h-12 mb-6 outline-0 border-b-2 border-[#BDBDBD]"
            placeholder="Enter your email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
          />
          <div className="flex justify-between ">
            <label className="ml-2 text-sm md:text-base">Password</label>
            <img
              src={eye}
              alt=""
              onClick={() => setVisible(!visible)}
              className="cursor-pointer w-5 "
            />
          </div>

          <input
            type={visible ? "text" : "password"}
            className="w-full h-12 mb-6 outline-0 border-b-2 border-[#BDBDBD]"
            placeholder="Enter your password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            value={userData.password}
          />
        </form>

        <button
          className="w-full h-12 mt-4 text-white bg-[#3F51B5] rounded-4xl hover:bg-blue-100"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm md:text-base">
          No Account Yet?
          <span
            className="text-blue-500 cursor-pointer ml-1 "
            onClick={() => usenavigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
