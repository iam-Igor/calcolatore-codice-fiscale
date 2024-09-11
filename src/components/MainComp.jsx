import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import comuni from "../assets/comuni.json";
import { useState } from "react";
import { calculate } from "../functions/functions";

const MainComp = () => {
  const [nome, SetNome] = useState("");
  const [cognome, SetCognome] = useState("");
  const [luogo, SetLuogo] = useState("");
  const [provincia, SetProvincia] = useState(comuni[0].codiceCatastale);
  const [data, SetData] = useState("");
  const [sesso, SetSesso] = useState("M");
  const api_key = import.meta.env.VITE_COD_API;

  const submitForm = (e) => {
    e.preventDefault();
    let giorno = data.substring(8);
    let mese = data.substring(5, 7);
    let anno = data.substring(0, 4);

    console.log("giorno", giorno);
    console.log("mese", mese);
    console.log("anno", anno);

    calculate(
      cognome,
      nome,
      sesso,
      luogo,
      provincia,
      giorno,
      mese,
      anno,
      api_key
    );
  };

  return (
    <Container fluid className="bg_terziary vh-100">
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <Card
            className="py-3 bg_secondary rounded-4 p-3 shadow main-card"
            style={{ width: "50rem" }}
          >
            <Card.Body className="p-1">
              <Card.Title className="bg_primary p-3 rounded-3">
                Calcolo codice fiscale
              </Card.Title>
              <div className="form-cont">
                <Form
                  onSubmit={(e) => {
                    submitForm(e);
                  }}
                >
                  <Form.Group className="mb-3 d-flex  align-items-center ">
                    <Form.Label className="me-2 right-label">Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Es. Mario"
                      className="long-input"
                      value={nome}
                      onChange={(e) => {
                        SetNome(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center ">
                    <Form.Label className="me-2 right-label">
                      Cognome
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Es. Rossi"
                      className="long-input"
                      value={cognome}
                      onChange={(e) => {
                        SetCognome(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center">
                    <Form.Label className="me-2 right-label">
                      Luogo di nascita
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Es. Milano"
                      className="long-input"
                      value={luogo}
                      onChange={(e) => {
                        SetLuogo(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 d-flex align-items-center  justify-content-between">
                    <div className="d-flex me-1 align-items-center prov-cont">
                      <Form.Label className="me-2 right-label prov-lab">
                        Provincia
                      </Form.Label>
                      <Form.Select
                        className="prov-input"
                        onChange={(e) => {
                          SetProvincia(e.target.value);
                        }}
                      >
                        {comuni.map((comune, index) => {
                          return (
                            <option key={index} value={comune.codiceCatastale}>
                              {comune.nome}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className="d-flex align-items-center sex-cont">
                      <Form.Label className="me-2">Sesso</Form.Label>
                      <Form.Select
                        className="sex-input"
                        value={sesso}
                        onChange={(e) => {
                          SetSesso(e.target.value);
                        }}
                      >
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </Form.Select>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex align-items-center  "
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="right-label">
                      Data di nascita
                    </Form.Label>
                    <Form.Control
                      type="date"
                      className="date-input"
                      value={data}
                      onChange={(e) => {
                        SetData(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button className="shadow btn-success" type="submit">
                    Calcola
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { MainComp };
