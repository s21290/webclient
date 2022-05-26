import { Container, Row } from "react-bootstrap";
import Link from "../fragments/Link";

const Test = () => {
  return (
    <Container className="text-center">
      <Row>
        <Link to="/tutorial">Tutoriale</Link>
      </Row>
      <Row>
        <Link to="/map">Mapa testowa</Link>
      </Row>
      <Row>
        <Link to="/medicaldata">Dane medyczne</Link>
      </Row>
      <Row>
        <Link to="/reports">Zgłoszenia</Link>
      </Row>
      <Row>
        <Link to="/newreport">Nowe zgłoszenie</Link>
      </Row>
      <Row>
        <Link to="/userdata">Dane użytkownika</Link>
        <Link to="/ambulances">Lista karetek</Link>
      </Row>
      <Row>
        <Link to="/mapAmbulance">Mapa karetek</Link>
      </Row>
      <Row>
        <Link to="/acceptReport/1">Przyjmowanie zgłoszeń</Link>
      </Row>
      <Row>
        <Link to="/VictimsList">Lista poszkodowanych</Link>
      </Row>
      <Row>
        <Link to="/check-in">Dyżur - check in/out</Link>
      </Row>
      <Row>
        <Link to="/doctors">Lista lekarzy</Link>
      </Row>
      <Row>
        <Link to="/driverMessage">Widomość do kierowcy</Link>
      </Row>
    </Container>
  );
};

export default Test;
