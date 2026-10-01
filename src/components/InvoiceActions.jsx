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
            span.style.color = clonedDoc.defaultView.getComputedStyle(input).color;
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
            div.style.color = clonedDoc.defaultView.getComputedStyle(textarea).color;
            textarea.parentNode.replaceChild(div, textarea);
          });

          // Preserve all invoice content in the snapshot; the PDF is fitted
          // onto one A4 page after rendering.
          clonedNode.style.height = "auto";
          clonedNode.style.minHeight = "297mm";
          clonedNode.style.maxHeight = "none";
          clonedNode.style.overflow = "visible";
          clonedNode.style.boxShadow = "none";
          clonedNode.style.margin = "0";

          const compactPdfStyles = clonedDoc.createElement("style");
          compactPdfStyles.textContent = `
            .invoice-a4 { padding: 8px !important; }
            .top-header { padding: 2px 4px !important; font-size: 10px !important; }
            .company-header { padding: 4px 6px !important; }
            .company-name-input { font-size: 22px !important; }
            .company-tagline-input, .company-specialist-input,
            .company-address-input { font-size: 10px !important; margin-top: 0 !important; }
            .company-contact-row { padding: 0 8px !important; margin-top: 2px !important; font-size: 9px !important; }
            .inline-input, .inline-input-wide { width: auto !important; font-size: 9px !important; }
            .bill-to-box, .invoice-info-box { padding: 4px 6px !important; font-size: 10px !important; }
            .customer-name-input, .address-textarea, .full-input, .invoice-info-value,
            .field-label, .section-label, .invoice-info-label { font-size: 10px !important; }
            .field-row-inline, .field-row { margin-bottom: 1px !important; }
            .invoice-table-wrapper { min-height: 0 !important; }
            .table-header-row th { height: 24px !important; padding: 2px !important; font-size: 10px !important; }
            .table-body-row td { height: 18px !important; padding: 0 3px !important; font-size: 10px !important; }
            .cell-input { font-size: 10px !important; }
            .footer-total-row, .footer-received-row,
            .footer-total-row td, .footer-received-row td { height: 24px !important; padding: 2px 4px !important; font-size: 10px !important; }
            .received-input { height: 16px !important; line-height: 16px !important; width: 75px !important; font-size: 10px !important; }
            .amount-in-words-section { padding: 4px 6px !important; font-size: 10px !important; }
            .amount-in-words-label { margin-bottom: 2px !important; }
            .bottom-footer { min-height: 72px !important; }
            .bottom-footer-section { padding: 4px 6px !important; font-size: 9px !important; }
            .terms-list { padding-left: 12px !important; }
            .terms-list li { margin-bottom: 1px !important; font-size: 8.5px !important; }
            .signature-img { width: 100% !important; height: 84px !important; max-height: none !important; object-fit: cover !important; object-position: center 55% !important; }
            .signature-label { padding-top: 2px !important; }
          `;
          clonedNode.prepend(compactPdfStyles);
        },
        windowHeight: Math.max(window.innerHeight, node.scrollHeight),
        scrollY: 0,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const fitScale = Math.min(
        1,
        pdfHeight / ((canvas.height / canvas.width) * pdfWidth)
      );
      const imageWidth = pdfWidth * fitScale;
      const imageHeight = (canvas.height / canvas.width) * imageWidth;
      const imageX = (pdfWidth - imageWidth) / 2;
      const imageY = (pdfHeight - imageHeight) / 2;

      pdf.addImage(
        canvas.toDataURL("image/png", 1.0),
        "PNG",
        imageX,
        imageY,
        imageWidth,
        imageHeight
      );

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
