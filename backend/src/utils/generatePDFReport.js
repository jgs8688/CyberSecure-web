import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generatePDFReport = async (url, scanResults) => {
  const outputPath = path.join('reports', `WebSure_Report_${Date.now()}.pdf`);

  fs.mkdirSync('reports', { recursive: true });

  const doc = new PDFDocument({ margin: 40 });
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Page Border
  doc.save()
    .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
    .strokeColor('#cfd8dc')
    .lineWidth(1)
    .stroke()
    .restore();

  //  Header
  doc
    .fillColor('#003366')
    .fontSize(22)
    .font('Helvetica-Bold')
    .text('websure - Website Security Report', { align: 'center' })
    .moveDown(0.3)
    .fontSize(12)
    .fillColor('#37474f')
    .font('Helvetica')
    .text(`Scanned URL: ${url}`, { align: 'center' })
    .text(`Scan Timestamp: ${new Date().toLocaleString()}`, { align: 'center' })
    .moveDown(1);

  // Table Title
  doc
    .fontSize(16)
    .fillColor('#1a237e')
    .font('Helvetica-Bold')
    .text('Scan Summary', { underline: true, align: 'center' })
    .moveDown(0.5);

  // Table config
  const startY = doc.y;
  const colPositions = {
    vulnerability: 40,
    status: 170,
    details: 240,
    suggestion: 400
  };
  const colWidths = {
    vulnerability: 120,
    status: 60,
    details: 150,
    suggestion: 160
  };

  const rowHeightPadding = 6;
  let y = startY;

  // Table Headers
  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor('#000000')
    .text('Vulnerability', colPositions.vulnerability, y, { width: colWidths.vulnerability })
    .text('Status', colPositions.status, y, { width: colWidths.status })
    .text('Details', colPositions.details, y, { width: colWidths.details })
    .text('Suggestion', colPositions.suggestion, y, { width: colWidths.suggestion });

  y += 18;
  doc.moveTo(40, y).lineTo(570, y).strokeColor('#bdbdbd').lineWidth(1).stroke();
  y += 4;

  const sections = {
    malware: 'Malware Links',
    phishing: 'Phishing Pages',
    openRedirects: 'Open Redirects',
    cms: 'CMS Vulnerabilities',
    securityHeaders: 'Missing Security Headers',
    openPorts: 'Open Ports',
    hiddenScripts: 'Hidden Scripts',
    dnsRebinding: 'DNS Rebinding'
  };

  const suggestions = {
    malware: 'Use malware scanners, remove infected links.',
    phishing: 'Avoid mimicking login pages; secure forms.',
    openRedirects: 'Validate redirect URLs server-side.',
    cms: 'Update CMS and use plugins for security.',
    securityHeaders: 'Add CSP, HSTS, and X-Frame-Options headers.',
    openPorts: 'Close/secure unused ports with firewall.',
    hiddenScripts: 'Audit and clean injected scripts.',
    dnsRebinding: 'Implement DNS hardening (e.g., DNS pinning).'
  };

  let isAlternate = false;

  for (const key in sections) {
    const title = sections[key];
    const data = scanResults[key];
    const suggestion = suggestions[key];

    let status = 'No';
    let details = '';

    if (key === 'cms') {
      status = data.vulnerable ? 'Yes' : 'No';
      details = `CMS: ${data.cms || 'None'}, ${data.info}`;
    } else if (key === 'securityHeaders') {
      status = data.missing.length ? 'Yes' : 'No';
      details = data.missing.join(', ') || 'None missing';
    } else if (key === 'openPorts') {
      status = data.openPorts.length ? 'Yes' : 'No';
      details = data.openPorts.join(', ') || 'None';
    } else if (key === 'hiddenScripts') {
      status = data.samples.length ? 'Yes' : 'No';
      details = data.samples.join(', ') || 'None';
    } else if (key === 'dnsRebinding') {
      status = data.records.length ? 'Yes' : 'No';
      details = data.records.join(', ') || 'None';
    } else if (key === 'malware') {
      status = data.found ? 'Yes' : 'No';
      details = data.links.length ? data.links.join(', ') : 'None';
    } else {
      status = data.found ? 'Yes' : 'No';
      details = data.info || '';
    }

    const detailsHeight = doc.heightOfString(details, { width: colWidths.details });
    const suggestionHeight = doc.heightOfString(suggestion, { width: colWidths.suggestion });
    const rowHeight = Math.max(detailsHeight, suggestionHeight, 14) + rowHeightPadding;

    // Alternate row background
    if (isAlternate) {
      doc
        .rect(40, y - 2, 510, rowHeight + 2)
        .fill('#f0f4f8')
        .fillColor('black');
    }
    isAlternate = !isAlternate;

    // Write data
    doc
      .fontSize(9)
      .fillColor('black')
      .font('Helvetica')
      .text(title, colPositions.vulnerability, y, { width: colWidths.vulnerability })
      .fillColor(status === 'Yes' ? '#d32f2f' : '#388e3c')
      .text(status, colPositions.status, y, { width: colWidths.status })
      .fillColor('black')
      .text(details, colPositions.details, y, { width: colWidths.details })
      .text(suggestion, colPositions.suggestion, y, { width: colWidths.suggestion });

    y += rowHeight;
  }

  // Footer
  doc
    .moveDown(2)
    .fontSize(9)
    .fillColor('gray')
    .text('Report generated by WebSure - Open Source Security Scanner', {
      align: 'center'
    })
    .text('© 2025 WebSure Team. All rights reserved.', {
      align: 'center'
    });

  doc.end();
  

  

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
  });
};
