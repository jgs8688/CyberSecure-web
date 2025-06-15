import React, { useState } from "react";
import { axiosInstance } from "../utility/baseUrl";
import ReportDetails from "./ReportDetails";
import { useAuth } from "../context/Authcontext";

const ScanPage: React.FC = () => {
  const { user: id } = useAuth();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [asideData, setAsideData] = useState({
    userId: "",
    name: "",
    pdf: "",
    domain: "",
  });

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    // todo
    try {
      const res = await axiosInstance.post("/url/scan", { url });
      setResult(res.data);
      console.log(
        "compleate report data with pdf link :" + res.data.pdf,
        res.data.domain,
        res.data.name
      );

      // set data to aside component
      setAsideData((prevData) => ({
        ...prevData,
        userId: id ?? "",
        name: res.data.name,
        pdf: res.data.pdf,
        domain: res.data.domain,
      }));
      handleAsideData();

      console.log("Aside data set:", asideData);
    } catch (error) {
      setResult({ error: "Scan failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleAsideData = async () => {
    try {
      // todo
      // Save aside data to the database
      const asideResponse = await axiosInstance.post("/url/report", asideData);
      if (asideResponse.status === 200) {
        console.log("Aside data saved successfully:", asideResponse.data);
      } else {
        console.error("Error saving aside data:", asideResponse.statusText);
      }
    } catch (error) {
      console.error("Error saving aside data:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] w-screen flex items-center justify-center  text-white">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-200 mb-3">
          WebSure – Website Vulnerability Scanner
        </h1>

        <p className="text-center text-sm text-indigo-100 mb-6 max-w-2xl mx-auto">
          Stay one step ahead of hackers.{" "}
          <span className="font-semibold text-white">WebSure</span> provides a
          fast, lightweight, and reliable way to analyze your website for common
          vulnerabilities and misconfigurations.
        </p>

        <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-indigo-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition duration-200"
          >
            {loading ? "Scanning..." : "Start Scan"}
          </button>
        </form>

        {loading && (
          <div className="text-center mt-6">
            <span className="inline-block animate-spin border-4 border-white border-t-transparent rounded-full w-8 h-8"></span>
            <p className="mt-2 text-sm text-indigo-200">
              Running scan, please wait...
            </p>
          </div>
        )}

        {result && (
          <div className="mt-6 bg-black/30 p-4 rounded-md max-h- custom-scroll averflow-y-auto max-h-[35vh]  overflow-auto border border-indigo-400">
            <h2 className="text-lg font-semibold text-indigo-300  text-center">
              Scan Results
            </h2>
            {/* report of the project  */}
            <ReportDetails data={result} />
          </div>
        )}

        <div className="mt-8 text-sm text-center text-gray-400">
          Built with for ethical hackers and developers.
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
