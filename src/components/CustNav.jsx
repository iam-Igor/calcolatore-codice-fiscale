import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CustNav = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow_btm">
      <Container>
        <Navbar.Brand
          onClick={() => {
            goTo("/calcola-cf");
          }}
        >
          Codice Fiscale Utility
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={location.pathname === "/calcola-cf" ? "fw-bold" : ""}
              onClick={() => {
                goTo("/calcola-cf");
              }}
            >
              Calcolo CF
            </Nav.Link>
            <Nav.Link
              className={location.pathname === "/inverse" ? "fw-bold" : ""}
              onClick={() => {
                goTo("/inverse");
              }}
            >
              Calcolo Inverso
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export { CustNav };
