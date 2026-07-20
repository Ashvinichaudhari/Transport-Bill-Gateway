import React from "react";

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
          <input
            className="inline-input"
            value={company.mobile}
            onChange={handleChange("mobile")}
          />
        </span>
        <span>
          Email :{" "}
          <input
            className="inline-input inline-input-wide"
            value={company.email}
            onChange={handleChange("email")}
          />
        </span>
      </div>
    </div>
  );
}
