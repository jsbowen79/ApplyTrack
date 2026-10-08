"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useEffect, useRef, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;

      if (width) {
        setPageWidth(width);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full min-w-0 justify-center overflow-hidden"
    >
      {error ? (
        <p role="alert">{error}</p>
      ) : (
        <Document
          file={url}
          onLoadError={() => setError("This resume cannot be displayed.")}
          onSourceError={() => setError("This resume cannot be displayed.")}
        >
          {pageWidth > 0 && <Page pageNumber={1} width={pageWidth} />}
        </Document>
      )}
    </div>
  );
}
