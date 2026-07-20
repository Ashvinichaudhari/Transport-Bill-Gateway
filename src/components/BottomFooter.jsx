import React from "react";
import signatureImg from "../assets/signature.png";

export default function BottomFooter({ bank, setBank }) {
  const handleChange = (field) => (e) =>
    setBank({ ...bank, [field]: e.target.value });

  return (
    <div className="bottom-footer">
      <div className="bottom-footer-section bank-details">
        <div className="section-label">Bank Details</div>
        <div className="field-row">
          <span className="field-label">PAN NO :</span>
          <input className="full-input" value={bank.pan} onChange={handleChange("pan")} />
        </div>
        <div className="field-row">
          <span className="field-label">BANK DETAIL :</span>
          <input className="full-input" value={bank.bankName} onChange={handleChange("bankName")} />
        </div>
        <div className="field-row">
          <span className="field-label">A/C NO :</span>
          <input className="full-input" value={bank.accountNo} onChange={handleChange("accountNo")} />
        </div>
        <div className="field-row">
          <span className="field-label">IFSC CO :</span>
          <input className="full-input" value={bank.ifsc} onChange={handleChange("ifsc")} />
        </div>
      </div>

      <div className="bottom-footer-section terms">
        <div className="section-label">Note</div>
        <ol className="terms-list">
          <li>Subject to Navi Mumbai Jurisdiction.</li>
          <li>Interest will be charged @ 24% if the bill is not paid within 15 days.</li>
          <li>Please pay by A/C Payee Cheque only.</li>
        </ol>
      </div>

      <div className="bottom-footer-section signature">
        <div className="signature-space">
          <img src={signatureImg} alt="Authorised Signatory" className="signature-img" />
        </div>
        <div className="section-label signature-label">Authorised Signatory</div>
      </div>
    </div>
  );
}
