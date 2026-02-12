import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PdfOptions {
  elementId: string;
  fileName: string;
  backgroundColor?: string;
}

/** Captures a DOM element as an image and saves it as a single-page A4 PDF. */
export const generateSinglePagePdf = async ({
  elementId,
  fileName,
  backgroundColor = "#ffffff",
}: PdfOptions) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Resume element not found.");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor,
  });

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  const renderWidth = imgWidth * scale;
  const renderHeight = imgHeight * scale;
  const xOffset = (pageWidth - renderWidth) / 2;
  const yOffset = (pageHeight - renderHeight) / 2;

  pdf.addImage(
    canvas.toDataURL("image/jpeg", 1.0),
    "JPEG",
    xOffset,
    yOffset,
    renderWidth,
    renderHeight,
    undefined,
    "FAST",
  );

  // Add links
  const elementRect = element.getBoundingClientRect();
  const links = element.querySelectorAll("a");
  
  // Calculate scale factor from DOM pixels to PDF units (mm)
  // renderWidth is the width of the image on the PDF in mm
  // element.offsetWidth is the width of the DOM element in px
  const domToPdfScale = renderWidth / element.offsetWidth;

  links.forEach((link) => {
    const linkRect = link.getBoundingClientRect();
    
    // Calculate position relative to the captured element
    const relativeX = linkRect.left - elementRect.left;
    const relativeY = linkRect.top - elementRect.top;

    // Convert to PDF coordinates
    const pdfX = xOffset + relativeX * domToPdfScale;
    const pdfY = yOffset + relativeY * domToPdfScale;
    const pdfW = linkRect.width * domToPdfScale;
    const pdfH = linkRect.height * domToPdfScale;

    pdf.link(pdfX, pdfY, pdfW, pdfH, { url: link.href });
  });

  pdf.save(fileName);
};
