import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { axiosInstance } from "../utility/baseUrl";
import ScanForm from "./ScanForm";
import {
  LayoutDashboard,
  Globe,
  Bug,
  ShieldCheck,
  X,
  Menu,
  User,
  LoaderCircle,
} from "lucide-react";
import { LogOut } from "lucide-react";

import logo from "../../public/assets/Logo.svg";
import { toast } from "react-toastify";

interface UserData {
  username: string;
  email: string;
}
interface ReportItem {
  name: string;
  domain: string;
  pdf: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData>();
  const { user: id, setUser, totalSans } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [value, setValue] = useState(true);
  const [reports, setReports] = useState<ReportItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userDatas = async () => {
      const res = await axiosInstance.get(`/user/getUser/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserData((pre) => ({ ...pre, ...res.data.data }));
      }
    };
    userDatas();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get(`url/report/${id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setReports(response.data.userReports);

          console.log("total scans : ", totalSans);
        } else {
          toast.error("Failed to fetch reports.");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching reports.");
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await axiosInstance.get("/user/signout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    if (!url) {
      toast.error("Please enter a URL to scan.");
      setLoading(false);
      return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast.error("Please enter a valid URL starting with http:// or https://");
      setLoading(false);
      return;
    }
    try {
      const res = await axiosInstance.post("/url/scan", { url });
      setResult(res.data);
      setValue(false);
    } catch (err) {
      setResult({ error: "Scan failed" });
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-6 w-6" />,
      onClick: () => navigate("/dashboard"),
    },
    {
      label: "Scan",
      icon: <Globe className="h-6 w-6" />,
      onClick: () => navigate("/ScanForm"),
    },
    {
      label: "Reports",
      icon: <Bug className="h-6 w-6" />,
      onClick: () => navigate("/report"),
    },
    {
      label: "Settings",
      icon: <ShieldCheck className="h-6 w-6" />,
      onClick: () => navigate("/settings"),
    },
    {
      label: "Sign Out",
      icon: <LogOut className="h-5 w-5 " />,

      onClick: handleSignOut,
    },
  ];

  function OverviewItem({
    title,
    value,
    bold,
  }: {
    title: string;
    value: string | number;
    bold?: boolean;
  }) {
    return (
      <div className="bg-[#1c1f26] p-6 rounded-lg shadow-md hover:bg-[#272b32] transition-colors flex justify-between items-center">
        <p className="text-gray-100">{title}</p>
        <p className={`text-white ${bold ? "font-bold" : ""}`}>{value}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );
  }

  if (!value && result) {
    return (
      <div className="bg-[#0f1115] text-white">
        <ScanForm resultValue={result} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex overflow-hidden relative">
      <div className="absolute top-4 left-4 md:hidden z-50">
        <Menu
          className="w-7 h-7 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      <aside
        className={`bg-[#1c1f26] fixed top-0 px-2 left-0 h-screen z-50 w-[250px]  md:border-r border-10 border-gray-700 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:block`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-15 h-15" />
            <h1 className="text-xl font-bold">WebSure</h1>
          </div>
          <X
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <ul className="mt-4">
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 p-4 rounded-xl hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                item.onClick();
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4  w-full overflow-x-hidden   md:border-l border-10 border-gray-700 ">
        <div className="w-full max-w-[75rem] mx-auto">
          <div className="flex justify-end mb-4">
            <User
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => navigate("/userProfile")}
            />
          </div>

          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

          <div className="bg-[#1c1f26] rounded-xl p-4 shadow-lg w-full mb-6">
            <h2 className="md:text-3xl text-xl font-semibold pb-2">
              Website Scan Overview
            </h2>
            <hr className="text-gray-500" />
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
              <OverviewItem title="Total Scans" value={reports?.length} bold />
              <OverviewItem title="Phishing Pages" value={0} />
              <OverviewItem title="Malware" value={0} />
              <OverviewItem title="Completed Scans" value={0} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1c1f26] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Scan</h2>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Website URL"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-4"
                required
              />
              <button
                onClick={handleScan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
              >
                Scan Now
              </button>
            </div>

            <div className="bg-[#1c1f26] p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Security Tips</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Keep your software updated</li>
                <li>Use strong passwords</li>
                <li>Enable two-factor authentication</li>
                <li>Regularly back up your data</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
