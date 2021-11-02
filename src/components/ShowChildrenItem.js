import React, { useState, useContext } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowChildrens } from "./ShowChildrens";
import AddEntityButton  from "./agregarEntidades";
import DeleteEntityButton from "./eliminarEntidades";
import {
  Accordion,
  Card,
  Button,
  Form,
  Badge,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { UserContext } from "../context/user-context";

export const ShowChildrenItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const { user } = useContext(UserContext);

  const handleClick = () => {
    setShow(!show);
  };

  const indicatorType = (item) => {
    if (item.type === "Eje") {
      return "SubEje";
    } else {
      return "Indicador";
    }
  };

  const handleShowMeta = () => {
    setShowMeta(!showMeta);
  };

  if (item.type !== "Indicator") {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleClick}>
              {item.type} - <b>{item.name?.value}</b>
            </Accordion.Header>
            <Accordion.Body>
              {user.usRole === "admin" && (
              <>
              <AddEntityButton item={item} />
              <DeleteEntityButton item={item} />
              </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* <button className="btn btn-primary ms-2" onClick={handleClick}>
          {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        </button> */}

        {show && <ShowChildrens type={item?.type} id={item?.id} />}
      </div>
    );
  } else {
    return (
      <div>
        {/* <button className="btn btn-primary ms-2 md-12" onClick={handleClick}>
          {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        </button> */}
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
          <DeleteEntityButton item={item} />
            <Accordion.Header onClick={handleClick}>
              <Container>
                <Row>
                  <Col>
                    {item.type} - {item.name.value} 
                  </Col>
                  <Col lg="2">
                    <Button variant="secondary" className={"btnIndicators"}>
                      Editar
                    </Button>
                    
                  </Col>
                </Row>
              </Container>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>

        {show && (
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Body>
                <Card className="text-center">
                  <Card.Header className="mb-3">
                    <div>
                      Tipo: <b>{item.indicatorType.value}</b>
                    </div>
                    <hr />
                    <div>
                      Descripcion: <b>{item.description.value}</b>
                    </div>
                    <hr />
                    {user.usRole !== "admin" && (
                      <div>
                        <div>
                          <div>Hoy</div>
                          28/10/2021
                          <ProgressBar
                            now={5}
                            label={`${5}%`}
                            variant="danger"
                          />
                        </div>
                        <hr />
                        <div>
                          <div>Meta</div>
                          27/10/2022
                          <ProgressBar
                            now={25}
                            label={`${25}%`}
                            variant="success"
                          />
                        </div>
                      </div>
                    )}
                  </Card.Header>
                  {/* {user.usRole !== "admin" && (
                    <Card.Body>
                      <Form>
                        <Form.Group className="mb-3" controlId="formIndicator">
                          <Form.Control
                            type="text"
                            placeholder="Ingrese la cantidad"
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="full-width"
                        >
                          Cargar dato
                        </Button>
                      </Form>
                    </Card.Body>
                  )} */}
                  <Container className="p-0">
                    <Row>
                      <Col>
                        <Button className="btn-load-indicator">
                          Cargar indicador
                        </Button>
                      </Col>
                      <Col>
                        <Button className="btn-load-goal">Cargar Meta</Button>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    );
  }
};
