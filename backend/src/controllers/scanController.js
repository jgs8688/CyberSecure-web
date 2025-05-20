import { detectPhishingPages } from "../utility/scanner/phishingDetector.js";
import { detectOpenRedirects } from "../utility/scanner/openRedirectDetector.js";
import { checkSecurityHeaders } from "../utility/scanner/securityHeadersChecker.js";
import { scanOpenPorts } from "../utility/scanner/portScanner.js";
import { detectHiddenScripts } from "../utility/scanner/hiddenScriptDetector.js";
import { checkDNSRebinding } from "../utility/scanner/dnsRebindingChecker.js";
import { generatePDFReport } from "../utils/generatePDFReport.js";
import { detectCMSVulnerabilities } from "../utility/scanner/cmsDetector.js";
import { detectMalwareLinks } from "../utility/scanner/malwareLinks.js";

export const scanWebsite = async (req, res) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const malware = await detectMalwareLinks(url);
    // await delay(15000);
    const phishing = await detectPhishingPages(url);
    // await delay(15000);
    const redirect = await detectOpenRedirects(url);
    // await delay(15000);
    const cms = await detectCMSVulnerabilities(url);
    // await delay(15000);
    const headers = await checkSecurityHeaders(url);
    // await delay(15000);
    const ports = await scanOpenPorts(url);
    // await delay(15000);
    const hidden = await detectHiddenScripts(url);
    // await delay(15000);
    const dns = await checkDNSRebinding(url);
    // await delay(15000);
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

    return res.status(200).json({
      message: "Scan complete",
      report: reportData,
      pdf: pdfPath,
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
