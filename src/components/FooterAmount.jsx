import React from "react";

export default function FooterAmount({ qtyTotal, amountTotal, received, setReceived }) {
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
          <td colSpan={2} className="footer-label">TOTAL</td>
          <td className="cell-center footer-qty-total">{qtyTotal}</td>
          <td className="cell-right footer-amount-total">₹ {amountTotal}</td>
        </tr>
        <tr className="footer-received-row">
          <td colSpan={2} className="footer-label">RECEIVED AMOUNT</td>
          <td className="cell-center"></td>
          <td className="cell-right">
            ₹{" "}
            <input
              type="number"
              className="received-input"
              value={received}
              onChange={(e) => setReceived(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
