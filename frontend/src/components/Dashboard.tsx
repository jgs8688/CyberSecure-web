import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScanForm from "./ScanForm";
import { axiosInstance } from "../utility/baseUrl";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import Aside from "./Aside";
import Footer from "./Footer";
import logo from "../assets/logo.png";

interface UserData {
  username: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = React.useState<UserData>();
  const navigate = useNavigate();
  const { user: id, setUser } = useAuth();

  useEffect(() => {
    const userDatas = async () => {
      const res = await axiosInstance.get(`/user/getUser/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        // console.log('User data:', res.data.data);
        setUserData((pre) => ({ ...pre, ...res.data.data }));
      }
    };
    userDatas();
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await axiosInstance.get("/user/signout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log("Sign out successful");
        toast.success("Sign out successful");
        setUser(null);
        console.log("User signed out:", id);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md shadow p-4 flex justify-between items-center sticky">
        <div className="flex items-center justify-center gap-2">
                    <img src={logo} alt="" className="w-10" />

          <div className="text-xl font-bold text-indigo-300">WebSure</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-right">
            <div className="font-semibold">{userData?.username}</div>
            <div className="text-xs text-gray-300">{userData?.email}</div>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-3 flex gap-2 md:flex-row flex-col-reverse">
        <div className="bg-white/10 p-6 rounded-xl shadow-lg md:flex-1   h-[calc(100vh-100px)] overflow-hidden">
          <Aside />
        </div>

        <div className="bg-white/10  flex items-center justify-center h-[calc(100vh-100px)] p-6 rounded-xl shadow-lg  md:flex-1/2 overflow-hidden">
          <ScanForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
