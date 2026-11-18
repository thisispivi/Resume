import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/atoms/Spinner";

/** A4 page width in px — must match $resume-width in _variables.scss */
const A4_WIDTH = 794;
/** A4 page height in px — must match $resume-height in _variables.scss */
const A4_HEIGHT = 1123;

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5];

interface PreviewStageProps {
  children: ReactNode;
  /** CSS custom properties describing the resume palette and font. */
  themeStyle: CSSProperties;
  isPdfDark: boolean;
  isFontLoading: boolean;
}

/**
 * Scrollable A4 stage around the rendered resume.
 *
 * The page is scaled to fit the available width and can be zoomed further by
 * the user. Dashed guides mark where each PDF page will break; they live
 * outside the captured element so they never reach the export.
 */
function PreviewStage({ children, isFontLoading, isPdfDark, themeStyle }: PreviewStageProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [zoomIndex, setZoomIndex] = useState(2);
  const [pageHeight, setPageHeight] = useState(A4_HEIGHT);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setFitScale(Math.min(1, entry.contentRect.width / A4_WIDTH));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageHeight(Math.max(A4_HEIGHT, entry.contentRect.height));
    });
    observer.observe(page);
    return () => observer.disconnect();
  }, []);

  const scale = fitScale * ZOOM_STEPS[zoomIndex];
  const pageCount = Math.max(1, Math.ceil(pageHeight / A4_HEIGHT));
  const breakCount = pageCount - 1;

  return (
    <div className="preview-stage">
      <div className="preview-stage__toolbar">
        <div className="preview-stage__zoom">
          <button
            aria-label={t("preview.zoomOut")}
            className="preview-stage__zoom-btn"
            disabled={zoomIndex === 0}
            onClick={() => setZoomIndex((index) => Math.max(0, index - 1))}
            type="button"
          >
            −
          </button>
          <span className="preview-stage__zoom-value">{Math.round(scale * 100)}%</span>
          <button
            aria-label={t("preview.zoomIn")}
            className="preview-stage__zoom-btn"
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            onClick={() => setZoomIndex((index) => Math.min(ZOOM_STEPS.length - 1, index + 1))}
            type="button"
          >
            +
          </button>
        </div>
        <span className="preview-stage__pages">{t("preview.pageCount", { count: pageCount })}</span>
      </div>

      <div className="preview-stage__scroll" ref={containerRef}>
        <div
          className="preview-stage__scaler"
          style={{
            transform: `scale(${String(scale)})`,
            width: A4_WIDTH,
            height: pageHeight * scale,
          }}
        >
          <div
            className="preview-wrapper"
            data-theme={isPdfDark ? "dark" : "light"}
            ref={pageRef}
            style={themeStyle}
          >
            {children}
            {breakCount > 0 ? (
              <div aria-hidden="true" className="preview-stage__guides">
                {Array.from({ length: breakCount }, (_, index) => (
                  <span
                    className="preview-stage__guide"
                    key={index}
                    style={{ top: A4_HEIGHT * (index + 1) }}
                  >
                    <span className="preview-stage__guide-label">
                      {t("preview.pageBreak", { page: index + 2 })}
                    </span>
                  </span>
                ))}
              </div>
            ) : null}
            {isFontLoading ? (
              <div className="preview-stage__loading">
                <Spinner size={40} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewStage;
