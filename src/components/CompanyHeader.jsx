import React from "react";

const COMPANY_MOBILE = "9870072217";
const COMPANY_EMAIL = "rbhosle412@gmail.com";

export default function CompanyHeader({ company, setCompany }) {
  const handleChange = (field) => (e) =>
    setCompany({ ...company, [field]: e.target.value });

  return (
    <div className="company-header">
      <input
        className="company-name-input"
        value={company.name}
        onChange={handleChange("name")}
      />
      <input
        className="company-tagline-input"
        value={company.tagline}
        onChange={handleChange("tagline")}
      />
      <input
        className="company-specialist-input"
        value={company.specialist}
        onChange={handleChange("specialist")}
      />
      <input
        className="company-address-input"
        value={company.address}
        onChange={handleChange("address")}
      />
      <div className="company-contact-row">
        <span>
          Mobile No. :{" "}
          <span className="inline-input inline-contact-value">
            {COMPANY_MOBILE}
          </span>
        </span>
        <span>
          Email :{" "}
          <span className="inline-input inline-input-wide inline-contact-value">
            {COMPANY_EMAIL}
          </span>
        </span>
      </div>
    </div>
  );
}
