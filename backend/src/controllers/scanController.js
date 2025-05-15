import { detectPhishingPages } from '../utility/scanner/phishingDetector.js';
import { detectOpenRedirects } from '../utility/scanner/openRedirectDetector.js';
import { checkSecurityHeaders } from '../utility/scanner/securityHeadersChecker.js';
import { scanOpenPorts } from '../utility/scanner/portScanner.js';
import { detectHiddenScripts } from '../utility/scanner/hiddenScriptDetector.js';
import { checkDNSRebinding } from '../utility/scanner/dnsRebindingChecker.js';
import { generatePDFReport } from '../utils/generatePDFReport.js';
import {detectCMSVulnerabilities} from"../utility/scanner/cmsDetector.js"
import {detectMalwareLinks} from "../utility/scanner/malwareLinks.js"

export const scanWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const [malware, phishing, redirect, cms, headers, ports, hidden, dns] = await Promise.all([
      detectMalwareLinks(url),
      detectPhishingPages(url),
      detectOpenRedirects(url),
       detectCMSVulnerabilities(url),
      checkSecurityHeaders(url),
      scanOpenPorts(url),
      detectHiddenScripts(url),
      checkDNSRebinding(url)
    ]);


    const reportData = {
      malware,
      phishing,
      openRedirects: redirect,
      cms,
      securityHeaders: headers,
      openPorts: ports,
      hiddenScripts: hidden,
      dnsRebinding: dns
    };

    const pdfPath = await generatePDFReport(url,reportData);

    return res.status(200).json({
      message: 'Scan complete',
      report: reportData,
      pdf: pdfPath
    });
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};