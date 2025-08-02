import { detectPhishingPages } from "../utility/scanner/phishingDetector.js";
import { detectOpenRedirects } from "../utility/scanner/openRedirectDetector.js";
import { checkSecurityHeaders } from "../utility/scanner/securityHeadersChecker.js";
import { scanOpenPorts } from "../utility/scanner/portScanner.js";
import { detectHiddenScripts } from "../utility/scanner/hiddenScriptDetector.js";
import { checkDNSRebinding } from "../utility/scanner/dnsRebindingChecker.js";
import { generatePDFReport } from "../utils/generatePDFReport.js";
import { detectCMSVulnerabilities } from "../utility/scanner/cmsDetector.js";
import { detectMalwareLinks } from "../utility/scanner/malwareLinks.js";
import imagekitData from "../router/router.imagekit.js"; // ✅ updated import

export const scanWebsite = async (req, res) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const malware = await detectMalwareLinks(url);
    const phishing = await detectPhishingPages(url);
    const redirect = await detectOpenRedirects(url);
    const cms = await detectCMSVulnerabilities(url);
    const headers = await checkSecurityHeaders(url);
    const ports = await scanOpenPorts(url);
    const hidden = await detectHiddenScripts(url);
    const dns = await checkDNSRebinding(url);

    console.log("Scan complete...");

    const reportData = {
      malware: malware || [],
      phishing: phishing || [],
      openRedirects: redirect || [],
      cms: cms || [],
      securityHeaders: headers || {},
      openPorts: ports || [],
      hiddenScripts: hidden || [],
      dnsRebinding: dns || [],
    };

    const pdfPath = await generatePDFReport(url, reportData);

    if (!pdfPath) {
      return res.status(500).json({ error: "Failed to generate PDF report" });
    }

    // ✅ Upload PDF to ImageKit
    const cloudFilePath = await imagekitData(pdfPath);
    if (!cloudFilePath) {
      return res.status(500).json({ error: "Failed to upload PDF to cloud" });
    }

    return res.status(200).json({
      message: "Scan complete",
      report: reportData,
      name: url,
      pdf: cloudFilePath,
      domain: new URL(url).hostname,
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
