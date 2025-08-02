import React, { useEffect, useState } from "react";
import {
  UserCircle,
  FileDown,
  ShieldCheck,
  Mail,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/Authcontext";
import { axiosInstance } from "../utility/baseUrl";
import { toast } from "react-toastify";

interface ReportItem {
  name: string;
  domain: string;
  pdf: string;
}

const UserProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);

  const { user, setTotalSans } = useAuth();

  useEffect(() => {
    if (!user) return;

    const userData = async () => {
      try {
        const res = await axiosInstance.get(`/user/getUser/${user}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserInfo(res.data.data);

          console.log("User data fetched:", res.data.data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    userData();
  }, [user]);

 useEffect(() => {
  const fetchReports = async () => {
    try {
      const response = await axiosInstance.get(`url/report/${user}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setReports(response.data.userReports);
        setTotalSans(response.data.userReports.length);
        console.log("Total scans:", response.data.userReports.length);
      } else {
        toast.error("Failed to fetch reports."); 
      }
    } catch (error) {
      toast.error("Something went wrong while fetching reports.");
      console.error(error);
    }
  };

  if (user) {
    fetchReports();
  }
}, [user]);

console.log("User Info:", userInfo);


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1115] via-[#12141b] to-[#1c1f26] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#1c1f26] text-white rounded-2xl shadow-xl p-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <UserCircle className="w-24 h-24 text-blue-400 drop-shadow-lg" />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-wide">
              {userInfo?.username}
            </h2>
            <div className="flex items-center gap-2 text-gray-400 mt-2 justify-center md:justify-start">
              <Mail className="w-4 h-4" />
              <span className="break-all">{userInfo?.email}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2a2d36] p-6 rounded-lg shadow-inner flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <ShieldCheck className="text-green-400 w-6 h-6" />
              <span className="text-base font-medium">Total Scans</span>
            </div>
            <span className="text-xl font-bold text-blue-300">{reports.length}</span>
          </div>

          {userInfo?.createdAt && (
            <div className="bg-[#2a2d36] p-6 rounded-lg shadow-inner flex justify-between items-center">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Calendar className="text-yellow-400 w-6 h-6" />
                <span className="text-base font-medium">Joined</span>
              </div>
              <span className="text-lg font-semibold text-gray-400">
                {new Date(userInfo?.createdAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Download Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => alert("Download summary coming soon")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white flex items-center gap-3 font-medium transition duration-300"
          >
            <FileDown className="w-5 h-5" />
            Download Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
