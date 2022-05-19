import { useDarkModeManager } from "./hooks/useDarkMode";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Test from "./components/temp/Test";
import TutorialView from "./components/content/tutorial/TutorialView";
import Tutorial from "./components/content/tutorial/Tutorial";
import EditBloodType from "./components/content/userinfo/bloodtype/EditBloodTypeView";
import AddAllergy from "./components/content/userinfo/allergy/AddAllergy";
import EditAllergy from "./components/content/userinfo/allergy/EditAllergy";
import AddMedicalCondition from "./components/content/userinfo/medicalCondition/AddMedicalCondition";
import EditMedicalCondition from "./components/content/userinfo/medicalCondition/EditMedicalCondition";
import UserData from "./components/content/userinfo/personalinfo/UserData";
import MedicalData from "./components/content/userinfo/MedicalData";
import MapTest from "./components/temp/MapTest";
import ReportsList from "./components/content/report/ReportsList";
import CreateReport from "./components/content/report/CreateReport";
import AmbulanceList from "./components/content/ambulance/AmbulanceList";
import MapAmbulance from "./components/content/ambulance/MapAmbulance"
import CreateAmbulance from "./components/content/ambulance/CreateAmbulance";
import AcceptReport from "./components/content/report/AcceptReport";
import { CookieConsent } from "./components/CookieConsent";
import { keycloakClient } from "./helpers/authHelper";
import EditUserData from "./components/content/userinfo/personalinfo/EditUserData";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import PatientsList from "./components/content/patient/PatientsList";
import DangerousPatient from "./components/content/patient/DangerousPatient";
import PatientInfo from "./components/content/patient/PatientInfo";
import CheckIn from "./components/content/staff/CheckIn";

const App = () => {
  const darkMode = useDarkModeManager();

  return (
    <ReactKeycloakProvider authClient={keycloakClient}>
      <BrowserRouter>
        <Navbar bg={`navbar-${darkMode.isDark ? "dark" : "light"}`} variant={darkMode.isDark ? "dark" : "light"} expand="lg">
          <Container fluid className="mx-3">
            <Navbar.Brand>GARY</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Strona tymczasowa</Nav.Link>
                <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
                <Nav.Link as={Link} to="/register">Rejestracja</Nav.Link>
                <Nav.Link onClick={darkMode.toggle}>Zmień motyw</Nav.Link>
                <Nav.Link onClick={() => keycloakClient.authenticated ? keycloakClient.logout() : keycloakClient.login()}>{keycloakClient.authenticated ? "Wyloguj" : "Zaloguj się"}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container fluid className="page-content">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/tutorial" element={<TutorialView />} />
            <Route path="/tutorial/:tutorialId" element={<Tutorial />} />
            <Route path="/userdata" element={<UserData />} />
            <Route path="/userdata/edit" element={<EditUserData />} />
            <Route path="/medicaldata" element={<MedicalData />} />
            <Route path="/medicaldata/editbloodtype" element={<EditBloodType />} />
            <Route path="/medicaldata/allergy/add" element={<AddAllergy />} />
            <Route path="/medicaldata/allergy/details/:allergyId" element={<EditAllergy />} />
            <Route path="/medicaldata/allergy/edit/:allergyId" element={<EditAllergy />} />
            <Route path="/medicaldata/medicalcondition/add" element={<AddMedicalCondition />} />
            <Route path="/medicaldata/medicalcondition/edit/:allergyId" element={<EditMedicalCondition />} />
            <Route path="/map" element={<MapTest />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="/report/:reportId" element={<CreateReport />} />
            <Route path="/newreport" element={<CreateReport />} />
            <Route path="/mapAmbulance" element={<MapAmbulance />} />
            <Route path="/ambulances" element={<AmbulanceList />} />
            <Route path="/ambulance/:ambulanceId" element={<CreateAmbulance />} />
            <Route path="/ambulance/add" element={<CreateAmbulance />} />
            <Route path="/acceptReport/:reportId" element={<AcceptReport />} />
            <Route path="/patientsList" element={<PatientsList />} />
            <Route path="/patient/:patientId" element={<DangerousPatient />} />
            <Route path="/patientInfo/:patientId" element={<PatientInfo />} />
            <Route path="/check-in" element={<CheckIn />} />
          </Routes>
        </Container>
        <CookieConsent debug />
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};

export default App;
