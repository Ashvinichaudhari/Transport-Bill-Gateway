import React from "react";

export default function CustomerInvoiceInfo({
  customer,
  setCustomer,
  invoiceInfo,
  setInvoiceInfo,
}) {
  const handleCustomerChange = (field) => (e) =>
    setCustomer({ ...customer, [field]: e.target.value });

  const handleInvoiceChange = (field) => (e) =>
    setInvoiceInfo({ ...invoiceInfo, [field]: e.target.value });

  return (
    <div className="customer-invoice-section">
      <div className="bill-to-box">
        <div className="section-label">BILL TO</div>
        <input
          className="customer-name-input"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleCustomerChange("name")}
        />
        <div className="field-row-inline">
          <span className="field-label">Address :</span>
          <textarea
            rows={2}
            className="address-textarea"
            placeholder="Address"
            value={customer.address}
            onChange={handleCustomerChange("address")}
          />
        </div>
        <div className="field-row-inline">
          <span className="field-label">Mobile :</span>
          <input
            className="full-input"
            value={customer.mobile}
            onChange={handleCustomerChange("mobile")}
          />
        </div>
      </div>

      <div className="invoice-info-box">
        <div className="invoice-info-col">
          <div className="invoice-info-label">Invoice No.</div>
          <input
            className="invoice-info-value"
            value={invoiceInfo.invoiceNo}
            onChange={handleInvoiceChange("invoiceNo")}
          />
        </div>
        <div className="invoice-info-col">
          <div className="invoice-info-label">Invoice Date</div>
          <input
            type="date"
            className="invoice-info-value"
            value={invoiceInfo.invoiceDate}
            onChange={handleInvoiceChange("invoiceDate")}
          />
        </div>
        <div className="invoice-info-col">
          <div className="invoice-info-label">Due Date</div>
          <input
            type="date"
            className="invoice-info-value"
            value={invoiceInfo.dueDate}
            onChange={handleInvoiceChange("dueDate")}
          />
        </div>
      </div>
    </div>
  );
}
