import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1115] via-[#1c1f26] to-[#111418] px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl md:text-9xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-2xl md:text-3xl text-white font-semibold mb-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-full transition"
        >
          <ArrowLeftCircle className="w-5 h-5 mr-2" />
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
