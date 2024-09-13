import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import comuni from "../assets/comuni.json";
import { useEffect, useState } from "react";
import CodiceFiscale from "codice-fiscale-js";

const MainComp = () => {
  const [nome, SetNome] = useState("");
  const [cognome, SetCognome] = useState("");
  const [luogo, SetLuogo] = useState("");
  const [provincia, SetProvincia] = useState(comuni[0].codiceCatastale);
  const [data, SetData] = useState("");
  const [sesso, SetSesso] = useState("M");
  const [cfCode, SetCfCode] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(false);
  const [errorMsg, SetErrorMsg] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {isCopied ? "Copiato negli appunti" : "Copia negli appunti"}
    </Tooltip>
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(cfCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let giorno = data.substring(8);
    let mese = data.substring(5, 7);
    let anno = data.substring(0, 4);

    SetIsLoading(true);

    setTimeout(() => {
      try {
        var cf = new CodiceFiscale({
          name: nome,
          surname: cognome,
          gender: sesso,
          day: parseInt(giorno),
          month: parseInt(mese),
          year: parseInt(anno),
          birthplace: luogo,
          birthplaceProvincia: provincia, // Optional
        });

        SetCfCode(cf);
      } catch (error) {
        SetError(true);
        SetErrorMsg(error.message);
      } finally {
        SetIsLoading(false);
      }
    }, 2000);
  };

  return (
    <Container
      fluid
      className="bg_terziary cont vh-100"
      transition-style="in:circle:center"
    >
      <Row>
        <Col className="d-flex justify-content-center mt-4 main-col">
          <Card
            className="py-3 bg_secondary rounded-5 p-3 shadow_btm main-card"
            style={{ width: "50rem" }}
          >
            <Card.Body className="p-1">
              <Card.Title className="p-3 rounded-3 bg-white rounded-4 shadow_btm mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0">Calcolo codice fiscale</p>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/offices/30/italy.png"
                    alt="italy"
                  />
                </div>
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
                      required
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
                      required
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
                      required
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
                            <option key={index} value={comune.sigla}>
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
                      required
                      type="date"
                      className="date-input"
                      value={data}
                      onChange={(e) => {
                        SetData(e.target.value);
                      }}
                    />
                  </Form.Group>
                  {isLoading ? (
                    <div className="dots py-2"></div>
                  ) : (
                    <Button
                      className="shadow_btm btn-success rounded-4"
                      type="submit"
                    >
                      Calcola
                    </Button>
                  )}
                </Form>
              </div>
            </Card.Body>
            {cfCode ? (
              <>
                <hr></hr>
                <div className="p-4 pt-0 text-center fw-bold fs-2 text-white d-flex justify-content-center">
                  <p className="m-0">{cfCode.code}</p>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <div
                      className={`clipboard ms-2 ${isCopied ? "copied" : ""}`}
                      onClick={handleCopy}
                    >
                      <svg
                        width="16"
                        height="32"
                        viewBox="0 0 16 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 12.75V4.25C3 3.42157 3.67157 2.75 4.5 2.75H12C12.8284 2.75 13.5 3.42157 13.5 4.25V12.75C13.5 13.5784 12.8284 14.25 12 14.25H4.5C3.67157 14.25 3 13.5784 3 12.75Z" />
                        <path
                          d="M3 12.75V4.25C3 3.42157 3.67157 2.75 4.5 2.75H12C12.8284 2.75 13.5 3.42157 13.5 4.25V12.75C13.5 13.5784 12.8284 14.25 12 14.25H4.5C3.67157 14.25 3 13.5784 3 12.75Z"
                          className="page"
                        />
                        <path
                          d="M6.25 9.75L7.75 11.25L10.25 7.75"
                          className="check"
                        />
                        <path d="M7 1.75001C6.72386 1.75001 6.5 1.97387 6.5 2.25001V3.5C6.5 4.4665 7.2835 5.25 8.25 5.25C9.2165 5.25 10 4.4665 10 3.5V2.25C10 1.97386 9.77614 1.75 9.5 1.75L7 1.75001Z" />
                      </svg>
                    </div>
                  </OverlayTrigger>
                </div>
              </>
            ) : error ? (
              <Alert
                variant="danger mt-3"
                dismissible
                onClose={() => {
                  SetError(false);
                }}
              >
                {errorMsg}
              </Alert>
            ) : (
              ""
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { MainComp };
