import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceActions({ targetRef }) {
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const node = targetRef.current;
    if (!node) return;
    setDownloading(true);

    try {
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc, clonedNode) => {
          // Hide interactive-only controls (Add Row, remove-row icons, buttons)
          clonedNode.querySelectorAll(".no-print").forEach((el) => {
            el.style.display = "none";
          });

          // html2canvas cannot reliably render <input> text — it produces
          // blank values or misaligned/overlapping text because it doesn't
          // respect an input's real baseline. Swapping each input for a
          // plain <span> with the SAME class (so it keeps identical width,
          // font, and alignment) lets it sit in the exact same spot in the
          // normal document flow — no manual position math needed.
          clonedNode.querySelectorAll("input").forEach((input) => {
            const span = clonedDoc.createElement("span");
            span.className = input.className;
            span.textContent = input.value || "";
            span.style.display = "inline-block";
            span.style.verticalAlign = "middle";
            input.parentNode.replaceChild(span, input);
          });

          // Same fix for <textarea> (used for the wrapping Address field) —
          // swap to a block-level div that preserves line wrapping.
          clonedNode.querySelectorAll("textarea").forEach((textarea) => {
            const div = clonedDoc.createElement("div");
            div.className = textarea.className;
            div.textContent = textarea.value || "";
            div.style.whiteSpace = "pre-wrap";
            div.style.wordBreak = "break-word";
            textarea.parentNode.replaceChild(div, textarea);
          });

          // Force the invoice onto a single, fixed A4-height page for the
          // snapshot (mirrors the print stylesheet) so the export never
          // spills a near-blank second page.
          clonedNode.style.height = "297mm";
          clonedNode.style.minHeight = "297mm";
          clonedNode.style.maxHeight = "297mm";
          clonedNode.style.overflow = "hidden";
          clonedNode.style.boxShadow = "none";
          clonedNode.style.margin = "0";

          const tableWrapper = clonedNode.querySelector(".invoice-table-wrapper");
          if (tableWrapper) {
            tableWrapper.style.minHeight = "0";
          }
        },
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="invoice-actions no-print">
      <button type="button" className="action-btn print-btn" onClick={handlePrint}>
        Print
      </button>
      <button
        type="button"
        className="action-btn download-btn"
        onClick={handleDownloadPdf}
        disabled={downloading}
      >
        {downloading ? "Generating..." : "Download PDF"}
      </button>
    </div>
  );
}
