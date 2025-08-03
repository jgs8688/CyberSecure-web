import React, { useState } from "react";
import { axiosInstance } from "../utility/baseUrl";
import ReportDetails from "./ReportDetails";
import { useAuth } from "../context/Authcontext";
import logo from "../../public/assets/Logo.svg";
// import { useNavigate } from 'react-router-dom';

interface resultData {
  resultValue: any;
}

const ScanPage: React.FC<resultData> = ({ resultValue }) => {


  console.log("Scan Result Data: ", resultValue);
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

 
      // set data to aside component
  
  

  return (
   

    <div className=" bg-[#0f1116] w-screen flex flex-col h-full bor border-10 border-gray-700">
      <div className="flex items-center  p-4">
        <img src={logo} alt="" className="w-15" />
        <h1 className="text-white font-bold text-2xl ">CyberCage-web</h1>
      </div>
      <div className="flex flex-col items-center  gap-2">
        <h1 className="text-white font-bold text-5xl">Scan Results</h1>
        <h3 className="text-[#a1a1aa] font-semibold text-xl">
          {resultValue?.name ||"please enter a valid URL on Quick Scan"}
        </h3>
        <div className="text-[#b1b1bb] bg-[#10b98136] font-semibold p-2 rounded">
          No Threats found
        </div>
      </div>
      <div>{resultValue && <ReportDetails data={resultValue} />}</div>
    </div>
  );
};

export default ScanPage;
