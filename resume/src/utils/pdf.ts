import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PdfOptions {
  elementId: string;
  fileName: string;
  backgroundColor?: string;
}

/** A4 aspect ratio (height / width), used to slice the capture into pages. */
const A4_RATIO = 297 / 210;

/**
 * Captures a DOM element as an image and saves it as an A4 PDF.
 *
 * Content taller than one page is sliced into as many pages as it needs, so a
 * long resume is never silently cropped. Anchors are re-drawn as invisible link
 * boxes on whichever page they land on, keeping URLs clickable in the export.
 */
export const generateResumePdf = async ({
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

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const sliceHeight = Math.round(canvas.width * A4_RATIO);
  const pageCount = Math.max(1, Math.ceil(canvas.height / sliceHeight));
  const mmPerCanvasPx = pageWidth / canvas.width;

  const sliceCanvas = document.createElement("canvas");
  sliceCanvas.width = canvas.width;
  const sliceContext = sliceCanvas.getContext("2d");
  if (!sliceContext) {
    throw new Error("Unable to prepare the PDF canvas.");
  }

  for (let page = 0; page < pageCount; page += 1) {
    const sourceY = page * sliceHeight;
    const sourceHeight = Math.min(sliceHeight, canvas.height - sourceY);

    sliceCanvas.height = sourceHeight;
    sliceContext.fillStyle = backgroundColor;
    sliceContext.fillRect(0, 0, sliceCanvas.width, sourceHeight);
    sliceContext.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      sourceHeight,
      0,
      0,
      canvas.width,
      sourceHeight,
    );

    if (page > 0) pdf.addPage();
    pdf.addImage(
      sliceCanvas.toDataURL("image/jpeg", 0.95),
      "JPEG",
      0,
      0,
      pageWidth,
      Math.min(sourceHeight * mmPerCanvasPx, pageHeight),
      undefined,
      "FAST",
    );
  }

  const elementRect = element.getBoundingClientRect();
  const canvasPxPerDomPx = canvas.width / element.offsetWidth;
  const pageHeightInDomPx = sliceHeight / canvasPxPerDomPx;

  element.querySelectorAll("a[href]").forEach((link) => {
    const linkRect = link.getBoundingClientRect();
    const relativeY = linkRect.top - elementRect.top;
    const page = Math.floor(relativeY / pageHeightInDomPx);
    if (page < 0 || page >= pageCount) return;

    const mmPerDomPx = canvasPxPerDomPx * mmPerCanvasPx;
    pdf.setPage(page + 1);
    pdf.link(
      (linkRect.left - elementRect.left) * mmPerDomPx,
      (relativeY - page * pageHeightInDomPx) * mmPerDomPx,
      linkRect.width * mmPerDomPx,
      linkRect.height * mmPerDomPx,
      { url: (link as HTMLAnchorElement).href },
    );
  });

  pdf.save(fileName);
};
