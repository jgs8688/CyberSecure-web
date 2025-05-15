import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/Authcontext";
import { useEffect, useState } from "react";
import { axiosInstance } from "./utility/baseUrl";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Report from "./pages/Report";

export default function App() {
  const { user, setUser,scanResult,setScanResult } = useAuth();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const authData = async () => {
      try {
        const res = await axiosInstance.get("/user/authorized", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setUser(res.data.user.id);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    authData();
  }, []); 

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Routes>
        <Route path="/" element={user?<Dashboard/> :<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <SignIn />} />
        <Route path ="/report" element={scanResult ? <Report /> : <Dashboard/>} />
        </Routes>
       <ToastContainer />
    </div>
  );
}
