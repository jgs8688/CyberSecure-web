import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportDetails from "./ReportDetails";
import { useAuth } from "../context/Authcontext";
import { ArrowLeft, Home } from "lucide-react";
import logo from "../../public/assets/Logo.svg";

interface resultData {
  resultValue: any;
}

const ScanForm: React.FC<resultData> = ({ resultValue }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("Scan Result Data: ", resultValue);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#0f1116] w-screen flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-white font-bold text-2xl">CyberSecure-web</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-white font-bold text-5xl mb-4">Scan Results</h1>
            <h3 className="text-[#a1a1aa] font-semibold text-xl mb-4">
              {resultValue?.name || resultValue?.domain || "Scan completed"}
            </h3>
            
            {/* Status Badge */}
            <div className="inline-block">
              {resultValue?.error ? (
                <div className="text-white bg-red-600 font-semibold px-4 py-2 rounded-lg">
                  Scan Failed
                </div>
              ) : (
                <div className="text-[#b1b1bb] bg-[#10b98136] font-semibold px-4 py-2 rounded-lg">
                  Scan Completed Successfully
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full">
            {resultValue?.error ? (
              <div className="text-center text-red-500 mt-10 p-8 bg-[#1c1f26] rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Scan Failed</h2>
                <p className="text-lg mb-4">
                  {resultValue.error || "An error occurred during the scan"}
                </p>
                <button
                  onClick={handleBackToDashboard}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : resultValue ? (
              <ReportDetails data={resultValue} />
            ) : (
              <div className="text-center text-gray-400 mt-10 p-8 bg-[#1c1f26] rounded-xl">
                <h2 className="text-2xl font-bold mb-4">No Scan Data</h2>
                <p className="text-lg mb-4">
                  No scan results available. Please start a new scan.
                </p>
                <button
                  onClick={handleBackToDashboard}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Start New Scan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanForm;