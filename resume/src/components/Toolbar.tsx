import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Toolbar.css";

const THEME_COLORS = [
  { name: "Teal", value: "#2b6777" },
  { name: "Navy", value: "#1a365d" },
  { name: "Charcoal", value: "#2d3748" },
  { name: "Burgundy", value: "#742a2a" },
  { name: "Forest", value: "#22543d" },
  { name: "Slate", value: "#4a5568" },
];

interface ToolbarProps {
  accentColor: string;
  onColorChange: (color: string) => void;
  resumeName: string;
}

function Toolbar({ accentColor, onColorChange, resumeName }: ToolbarProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = pageWidth / imgWidth;
      const scaledHeight = imgHeight * scale;

      if (scaledHeight <= pageHeight) {
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          0,
          pageWidth,
          scaledHeight,
        );
      } else {
        const pxPerPage = pageHeight / scale;
        let yOffset = 0;
        let pageNum = 0;

        while (yOffset < imgHeight) {
          const chunkHeight = Math.min(pxPerPage, imgHeight - yOffset);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgWidth;
          pageCanvas.height = chunkHeight;
          const ctx = pageCanvas.getContext("2d");

          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, imgWidth, chunkHeight);
            ctx.drawImage(
              canvas,
              0,
              yOffset,
              imgWidth,
              chunkHeight,
              0,
              0,
              imgWidth,
              chunkHeight,
            );
            if (pageNum > 0) pdf.addPage();
            pdf.addImage(
              pageCanvas.toDataURL("image/jpeg", 1.0),
              "JPEG",
              0,
              0,
              pageWidth,
              chunkHeight * scale,
            );
          }

          yOffset += pxPerPage;
          pageNum++;
        }
      }

      const fileName = resumeName
        ? `${resumeName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="toolbar">
      <div className="toolbar-section">
        <h1 className="toolbar-title">Resume Builder</h1>
      </div>
      <div className="toolbar-section toolbar-center">
        <span className="theme-label">Theme</span>
        <div className="color-swatches">
          {THEME_COLORS.map((c) => (
            <button
              key={c.value}
              className={`swatch${accentColor === c.value ? " swatch-active" : ""}`}
              style={{ backgroundColor: c.value }}
              onClick={() => onColorChange(c.value)}
              title={c.name}
              aria-label={`${c.name} theme`}
            />
          ))}
        </div>
      </div>
      <div className="toolbar-section toolbar-end">
        <button
          className="btn-download"
          onClick={handleDownload}
          disabled={downloading}
          style={{ backgroundColor: accentColor }}
        >
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </header>
  );
}

export default Toolbar;
