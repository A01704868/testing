import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
//import TimePicker from "react-bootstrap-time-picker";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { saveAnuncio } from "../services/index";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function AgregarAnuncio() {
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    descripcion: "",
    parqueId: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      setValidated(true);
    }

    if(validated){
      saveAnuncio({ ...formValues });
      document.location.href="/";
    }

  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
      <BarraNav />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 class="h1-form">Agregar Anuncio</h1>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Esta ruta esta compuesta por..."
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>id parque</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Id del parque"
              name="parqueId"
              value={formValues.parqueId}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" className="mb-4">Agregar</Button>
      </Form>
      <Footer/>
      </RBACWrapper>
    </div>
  );
}

export default AgregarAnuncio;
