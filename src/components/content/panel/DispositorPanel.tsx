import { Container } from "react-bootstrap";
import Navtab from "../../fragments/navigation/Navtab";
import { Route, Routes } from "react-router-dom";
import AcceptReport from "../report/AcceptReport";
import Report from "../incident/Report";

const DispositorPanel = () => {
  const links = [
    { to: "reports", text: "Zgłoszenia" }
  ];

  return (
    <Container fluid className="my-3">
      <Navtab links={links} />
      <Routes>
        <Route path="reports" element={<AcceptReport />} />
        <Route path="reports/:idReport" element={<Report />} />
      </Routes>
    </Container>
  );
};

export default DispositorPanel;
