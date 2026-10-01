import React from "react";

export default function FooterAmount({
  qtyTotal,
  amountTotal,
  received,
  setReceived,
  pendingAmount,
}) {
  return (
    <table className="footer-amount-table">
      <colgroup>
        <col style={{ width: "9%" }} />
        <col style={{ width: "61%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "10%" }} />
      </colgroup>
      <tbody>
        <tr className="footer-total-row">
          <td colSpan={2} className="footer-label">
            TOTAL
          </td>
          <td className="cell-center footer-qty-total">{qtyTotal}</td>
          <td className="cell-right footer-amount-total">
            {"\u20B9 "}{amountTotal}
          </td>
        </tr>
        <tr className="footer-received-row">
          <td colSpan={4}>
            <div className="footer-payment-row">
              <div className="footer-payment-group">
                <span className="footer-label">RECEIVED AMOUNT</span>
                <span className="received-entry">
                  {"\u20B9 "}
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="received-input"
                    aria-label="Received amount"
                    value={received}
                    onChange={(e) => setReceived(e.target.value)}
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </span>
              </div>
              <div className="footer-payment-group pending-payment-group">
                <span className="footer-label">PENDING AMOUNT</span>
                <span className="footer-pending-amount">
                  {"\u20B9 "}{pendingAmount}
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
