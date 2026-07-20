import React from "react";

export default function InvoiceTable({ rows, setRows }) {
  const handleCellChange = (id, field) => (e) => {
    const value = e.target.value;
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;
        const updated = { ...row, [field]: value };
        const qty = parseFloat(updated.qty) || 0;
        const rate = parseFloat(updated.rate) || 0;
        updated.amount = (qty * rate).toFixed(2);
        return updated;
      })
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        services: "",
        container: "",
        vehicle: "",
        qty: "",
        rate: "",
        amount: "0.00",
      },
    ]);
  };

  const removeRow = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="invoice-table-wrapper">
      <table className="invoice-table">
        <colgroup>
          <col style={{ width: "9%" }} />
          <col style={{ width: "27%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "18%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col className="no-print-col" style={{ width: "0%" }} />
        </colgroup>
        <thead>
          <tr className="table-header-row">
            <th>S.NO</th>
            <th>SERVICES</th>
            <th>CONTAINER</th>
            <th>VEHICLE</th>
            <th>QTY</th>
            <th>RATE</th>
            <th>AMOUNT</th>
            <th className="no-print"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="table-body-row">
              <td className="cell-center">{index + 1}</td>
              <td>
                <input
                  className="cell-input"
                  value={row.services}
                  onChange={handleCellChange(row.id, "services")}
                />
              </td>
              <td>
                <input
                  className="cell-input"
                  value={row.container}
                  onChange={handleCellChange(row.id, "container")}
                />
              </td>
              <td>
                <input
                  className="cell-input"
                  value={row.vehicle}
                  onChange={handleCellChange(row.id, "vehicle")}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="cell-input cell-center"
                  value={row.qty}
                  onChange={handleCellChange(row.id, "qty")}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="cell-input cell-right"
                  value={row.rate}
                  onChange={handleCellChange(row.id, "rate")}
                />
              </td>
              <td className="cell-right">{row.amount}</td>
              <td className="no-print remove-row-cell">
                <button
                  type="button"
                  className="remove-row-btn no-print"
                  onClick={() => removeRow(row.id)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="add-row-btn no-print" onClick={addRow}>
        + Add Row
      </button>
    </div>
  );
}
