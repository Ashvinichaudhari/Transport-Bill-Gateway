import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import LogisticsInvoice from "./components/LogisticsInvoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/invoice" element={<LogisticsInvoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
