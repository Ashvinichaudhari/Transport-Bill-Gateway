import React from "react";

export default function AmountInWords({ words }) {
  return (
    <div className="amount-in-words-section">
      <div className="amount-in-words-label">Total Amount (in words)</div>
      <div className="amount-in-words-value">{words}</div>
    </div>
  );
}
