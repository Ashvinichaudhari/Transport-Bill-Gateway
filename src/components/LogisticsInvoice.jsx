import React, { useMemo, useRef, useState } from "react";
import InvoiceTopHeader from "./InvoiceTopHeader";
import CompanyHeader from "./CompanyHeader";
import CustomerInvoiceInfo from "./CustomerInvoiceInfo";
import InvoiceTable from "./InvoiceTable";
import FooterAmount from "./FooterAmount";
import AmountInWords from "./AmountInWords";
import BottomFooter from "./BottomFooter";
import InvoiceActions from "./InvoiceActions";
import numberToWords from "../utils/numberToWords";
import "../styles/Invoice.css";

const initialRows = [
  { id: 1, services: "", container: "", vehicle: "", qty: "", rate: "", amount: "0.00" },
  { id: 2, services: "", container: "", vehicle: "", qty: "", rate: "", amount: "0.00" },
  { id: 3, services: "", container: "", vehicle: "", qty: "", rate: "", amount: "0.00" },
];

export default function LogisticsInvoice() {
  const invoiceRef = useRef(null);

  const [company, setCompany] = useState({
    name: "ARVI TRANSPORT",
    tagline:
      "Transport Contractor, Light Heavy Containers, Loding, Unloading & Labour Contractors.",
    specialist:
      "Sepecilist In : Export, Import Container Handing & ODC Consignment",
    address: "UL-2, B-8, R-102, UANNATI, SEC-19, ULVE. 410206",
    mobile: "9870072217",
    email: "rbhosle412@gmail.com",
  });

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    mobile: "",
  });

  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNo: "",
    invoiceDate: "",
    dueDate: "",
  });

  const [rows, setRows] = useState(initialRows);
  const [received, setReceived] = useState("0");

  const [bank, setBank] = useState({
    pan: "BGTPB3602H",
    bankName: "GS MAHANAGAR CO.OP. BANK LTD.",
    accountNo: "039011200000193",
    ifsc: "MCBL0960039",
  });

  const qtyTotal = useMemo(
    () => rows.reduce((sum, r) => sum + (parseFloat(r.qty) || 0), 0),
    [rows]
  );

  const amountTotal = useMemo(
    () => rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0),
    [rows]
  );

  const amountWords = useMemo(() => numberToWords(amountTotal), [amountTotal]);

  return (
    <div className="invoice-page-container">
      <InvoiceActions targetRef={invoiceRef} />

      <div className="invoice-a4" ref={invoiceRef}>
        <InvoiceTopHeader />

        <CompanyHeader company={company} setCompany={setCompany} />

        <CustomerInvoiceInfo
          customer={customer}
          setCustomer={setCustomer}
          invoiceInfo={invoiceInfo}
          setInvoiceInfo={setInvoiceInfo}
        />

        <InvoiceTable rows={rows} setRows={setRows} />

        <FooterAmount
          qtyTotal={qtyTotal}
          amountTotal={amountTotal.toFixed(2)}
          received={received}
          setReceived={setReceived}
        />

        <AmountInWords words={amountWords} />

        <BottomFooter bank={bank} setBank={setBank} />
      </div>
    </div>
  );
}
