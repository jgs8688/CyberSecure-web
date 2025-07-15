import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utility/baseUrl";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";
import { FileText, Globe, LoaderCircle } from "lucide-react";

interface ReportItem {
  name: string;
  domain: string;
  pdf: string;
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user,setTotalSans,totalSans } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`url/report/${user}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setReports(response.data.userReports);
          setTotalSans(reports.length);
          
          

          console.log("total scans : ",totalSans)
        } else {
          toast.error("Failed to fetch reports.");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching reports.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white p-6 border-10 border-gray-700">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Scan Reports</h2>
        <span className="text-sm text-gray-400">Total: {reports.length}</span>
      </div>

      {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <LoaderCircle className="animate-spin w-12 h-12 text-blue-500" />
          </div>
      ) : reports.length === 0 ? (
        <div className="text-gray-400 text-center py-10">
          <p>No reports found.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <li
              key={index}
              className="bg-[#1c1f26] rounded-lg p-5 shadow-md hover:bg-[#272b32] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="text-blue-500 w-5 h-5" />
                <h3 className="text-lg font-semibold text-blue-400 truncate">
                  {report.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                <Globe className="w-4 h-4 text-green-400" />
                <span className="truncate">{report.domain}</span>
              </div>
              <a
                href={report.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Report;
