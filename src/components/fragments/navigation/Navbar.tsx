import { useDarkMode, useDarkModeManager } from "../../../hooks/useDarkMode";
import { Nav, NavDropdown, Navbar as Inner, Container } from "react-bootstrap";
import NavLink from "./NavLink";
import { FaHome, FaMedkit, FaBook, FaUserCircle, FaMap, FaNotesMedical, FaToolbox, FaUserSecret } from "react-icons/fa";
import { isDispositor, isDirector, isAuth } from "../../../helpers/authHelper";
import CheckIn from "../../content/staff/CheckIn";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useLogout } from "../../../hooks/useAuth";
import NavDrop from "./NavDrop";
import { IoMdSettings, IoIosPaper } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";

const MenuBar = () => {
  return (
    <Nav className="me-auto">
      <NavLink to="/">
        <FaHome />
        <span className="px-1">Strona główna</span>
      </NavLink>
      <NavLink to="/newreport">
        <FaMedkit />
        <span className="px-1">Zgłoszenie</span>
      </NavLink>
      <NavLink to="/tutorial">
        <FaBook />
        <span className="px-1">Poradniki</span>
      </NavLink>
      {isDispositor() || isDirector() ? (
        <NavLink to="/map">
          <FaMap />
          <span className="px-1">Mapa</span>
        </NavLink>
      ) : ""}
      {isDispositor() ? (
        <NavLink to="/dispanel/reports">
          <FaNotesMedical />
          <span className="px-1">Panel dyspozytora</span>
        </NavLink>
      ) : ""}
      {isDirector() ? (
        <NavLink to="/admpanel/reports">
          <FaToolbox />
          <span className="px-1">Panel kierownika</span>
        </NavLink>
      ) : ""}
    </Nav>
  );
};

const SideMenu = () => {
  const darkMode = useDarkModeManager();

  return (
    <Nav>
      {isDispositor() ? <CheckIn /> : ""}
      <Nav.Link onClick={darkMode.toggle} className={`d-inline-flex align-items-center nav-link-${darkMode.isDark ? "dark" : "light"}`}>
        <HiOutlineLightBulb />
        <span className="px-1">Zmień motyw</span>
      </Nav.Link>
      <UserDropdown />
    </Nav>
  );
};

const UserDropdown = () => {
  const darkMode = useDarkMode();
  const logout = useLogout();

  return (
    <NavDropdown align="end" title={
        <span className="d-inline-flex align-items-center">
          <FaUserCircle />
          <span className="px-1">Konto</span>
        </span>
      } className={`nav-link-${darkMode ? "dark" : "light"}`}>
      {isAuth() ? (
        <>
          <NavDrop to="/settings/userdata">
            <IoMdSettings />
            <span className="px-1">Ustawienia</span>
          </NavDrop>
          <NavDrop to="/settings/medicaldata">
            <FaNotesMedical />
            <span className="px-1">Dane medyczne</span>
          </NavDrop>
          <NavDrop to="/settings/trustedperson">
            <FaUserSecret />
            <span className="px-1">Osoba zaufana</span>
          </NavDrop>
          <NavDropdown.Divider />
        </>
      ) : ""}
      {isAuth() ? (
        <NavDropdown.Item onClick={logout} className="d-inline-flex align-items-center">
          <BiLogIn />
          <span className="px-1">Wyloguj</span>
        </NavDropdown.Item>
      ) : (
        <NavDrop to="/login">
          <BiLogIn />
          <span className="px-1">Zaloguj się</span>
        </NavDrop>
      )}
      {isAuth() ? "" : (
        <NavDrop to="/register">
          <IoIosPaper />
          <span className="px-1">Zarejestruj się</span>
        </NavDrop>
      )}
    </NavDropdown>
  );
};

const Navbar = () => {
  const darkMode = useDarkMode();

  return (
    <Inner bg={`navbar-${darkMode ? "dark" : "light"}`} variant={darkMode ? "dark" : "light"} expand="lg">
      <Container fluid>
        <Inner.Brand className="px-5">GARY</Inner.Brand>
        <Inner.Toggle aria-controls="basic-navbar-nav" />
        <Inner.Collapse id="basic-navbar-nav">
          <MenuBar />
          <SideMenu />
        </Inner.Collapse>
      </Container>
    </Inner>
  );
};

export default Navbar;
