import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustNav = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    if (path === "/") {
      navigate("/");
    } else if (path === "/inverse") {
      navigate("/inverse");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand href="#home">Codice Fiscale Utility</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                goTo("/");
              }}
            >
              Calcolo CF
            </Nav.Link>
            <Nav.Link
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
