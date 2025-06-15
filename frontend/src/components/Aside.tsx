import { useEffect, useState } from "react";
import "../index.css";
import { axiosInstance } from "../utility/baseUrl";
import { useAuth } from "../context/Authcontext";

interface ScanReport {
  _id: string;
  userId: string;
  name: string;
  domain: string;
  pdf: string;
  createdAt: string;
  updatedAt: string;
}

export default function Aside() {
  const { user: userId } = useAuth();
  const [reports, setReports] = useState<ScanReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/url/report/${userId}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setReports(res.data.userReports);
        } else {
          console.error("Error fetching data:", res.statusText);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [reports]);

  useEffect(() => {
    if (reports.length > 0) {
      console.log("Updated reports state:", reports);
    }
  }, [reports]);

  // Loading UI
  if (loading) {
    return (
      <div>
        <div className="bg-white/5 rounded-lg shadow-md p-4">
          <h1 className="text-2xl font-bold text-center">User Reports</h1>
          <p className="text-center">Here are your recent scans and reports.</p>
        </div>
        <div className="text-center text-white p-8">
          <p>Loading user reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white/5 rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">User Reports</h1>
        <p className="text-center">Here are your recent scans and reports.</p>
      </div>

      <div className="overflow-y-auto max-h-[70vh] mt-4 custom-scroll h-screen">
        {reports.length === 0 ? (
          <p className="text-center text-gray-300 mt-6">
            No reports available.
          </p>
        ) : (
          reports.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 rounded-lg shadow-md p-4 mt-4 "
            >
              <h2 className="text-xl font-bold">{item.domain}</h2>
              <p className="text-sm  ">
                URL:{" "}
                <a
                  href={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500   hover:underline hover:text-blue-700 "
                >
                  {item.name}
                </a>
              </p>
              <p className="text-sm">
                PDF:{" "}
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 "
                >
                  🧾 Download Report
                </a>
              </p>
              <p className="text-sm text-gray-200 mt-1">
                <span>Scanned</span>:{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
