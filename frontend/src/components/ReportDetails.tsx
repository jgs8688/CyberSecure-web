import React from "react";

interface reportData {
  data: any;
}

const ReportDetails: React.FC<reportData> = ({ data }) => {
  if (!data || !data.report) {
    return (
      <div className="text-center text-red-500 mt-10">
        Report not found or invalid data.
      </div>
    );
  }

  const { report } = data;

  return (
    <div className="mx-auto p-6 bg-[#0f1116] shadow-lg rounded-xl mt-8">
      <table className="w-full text-sm border border-gray-200 rounded overflow-y-auto custom-scroll">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 text-slate-600">Category</th>
            <th className="p-3 text-slate-600">Status</th>
            <th className="p-3 text-slate-600">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="p-3 font-medium text-slate-500">Malware</td>
            <td
              className={`p-3 ${
                !report?.malware?.found ? "text-green-500" : "text-red-500"
              }`}
            >
              {report?.malware?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.malware?.links?.length > 0
                ? report.malware.links.join(", ")
                : "No suspicious links"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">Phishing</td>
            <td
              className={`p-3 ${
                !report?.phishing?.found ? "text-green-500" : "text-red-500"
              }`}
            >
              {report?.phishing?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.phishing?.found
                ? "Avoid mimicking login pages; secure forms"
                : "-"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">Open Redirects</td>
            <td
              className={`p-3 ${
                !report?.openRedirects?.found
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {report?.openRedirects?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.openRedirects?.found
                ? "Validate redirect URLs server-side"
                : "-"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">CMS</td>
            <td
              className={`p-3 ${
                !report?.cms?.cms ? "text-green-500" : "text-red-500"
              }`}
            >
              {report?.cms?.cms ? report.cms.cms : "Not Detected"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.cms?.vulnerable ? "Vulnerable" : "Safe"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">Security Headers</td>
            <td
              className={`p-3 ${
                report?.securityHeaders?.missing?.length === 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {report?.securityHeaders?.missing?.length === 0
                ? "All Present"
                : "Missing"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.securityHeaders?.missing?.length > 0 ? (
                <ul className="list-disc list-inside text-red-600">
                  {(report?.securityHeaders?.missing || []).map(
                    (item: any, idx: number) => <li key={idx}>{item}</li>
                  )}
                </ul>
              ) : (
                "All essential headers are present"
              )}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">Open Ports</td>
            <td
              className={`p-3 ${
                !report?.openPorts?.found ? "text-green-500" : "text-red-500"
              }`}
            >
              {report?.openPorts?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500">
              {report?.openPorts?.openPorts?.length > 0
                ? report.openPorts.openPorts.join(", ")
                : "No open ports"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">Hidden Scripts</td>
            <td
              className={`p-3 ${
                !report?.hiddenScripts?.found
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {report?.hiddenScripts?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500 max-w-12">
              {report?.hiddenScripts?.samples?.length > 0
                ? report.hiddenScripts.samples.join(", ")
                : "No hidden scripts"}
            </td>
          </tr>

          <tr>
            <td className="p-3 font-medium text-slate-500">DNS Rebinding</td>
            <td
              className={`p-3 ${
                !report?.dnsRebinding?.found
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {report?.dnsRebinding?.found ? "Found" : "Not Found"}
            </td>
            <td className="p-3 text-slate-500 max-w-12">
              {report?.dnsRebinding?.records?.length > 0
                ? report.dnsRebinding.records.join(", ")
                : "No rebinding records"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mt-6">
        {data?.pdf ? (
          <a
            href={data.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            PDF Report
          </a>
        ) : (
          <p className="text-gray-400 italic">PDF report not available</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
