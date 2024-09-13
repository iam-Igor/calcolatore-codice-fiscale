import CodiceFiscale from "codice-fiscale-js";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

const Inverse = () => {
  const [cfCode, SetCfCode] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const [error, SetError] = useState(false);
  const [errorMsg, SetErrorMsg] = useState("");
  const [info, SetInfo] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    SetIsLoading(true);

    try {
      var cf = new CodiceFiscale(cfCode);
      setTimeout(() => {
        SetInfo(cf.toJSON());
        SetIsLoading(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        SetIsLoading(false);
        SetError(true);
        SetErrorMsg(error.message);
      }, 2000);
    }
  };

  return (
    <Container
      fluid
      className="bg_terziary cont vh-100"
      transition-style="in:circle:center"
    >
      <Row>
        <Col className="d-flex justify-content-center mt-4 ">
          <Card
            className="py-3 bg_secondary rounded-5 p-3 shadow_btm main-card"
            style={{ width: "50rem" }}
          >
            <Card.Body className="p-1">
              <Card.Title className="p-3 rounded-3 bg-white rounded-4 shadow mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="m-0">Calcolo codice fiscale inverso</p>
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
                    <Form.Label className="me-2 right-label">
                      Codice Fiscale
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Es. RSSMR.."
                      value={cfCode}
                      className="long-input"
                      onChange={(e) => {
                        SetCfCode(e.target.value);
                      }}
                      maxLength={16}
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
            {info ? (
              <>
                <hr></hr>
                <div className="p-4 pt-0 text-center fs-5 text-white infos">
                  <p>
                    Nome: <span>{info.name}</span>
                  </p>
                  <p>
                    Cognome: <span>{info.surname}</span>
                  </p>
                  <p>
                    Sesso: <span>{info.gender}</span>
                  </p>
                  <p>
                    Data di nascita: <span>{info.birthday}</span>
                  </p>
                  <p>
                    Luogo di nascita: <span>{info.birthplace}</span>
                  </p>
                  <p>
                    Provincia: <span>{info.birthplaceProvincia}</span>
                  </p>
                  <p>
                    CF: <span>{info.cf}</span>
                  </p>
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

export { Inverse };
