import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
//import TimePicker from "react-bootstrap-time-picker";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { saveCart } from "../services/index";
import "../css/styles.css";
import { useParams } from "react-router-dom";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function AgregarCartaRuta() {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    parqueId: id,
  });

  const handleSubmit = (event) => {
    saveCart({ ...formValues });
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="full-height-vh">
      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
      <BarraNav />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 class="h1-form">Agregar Tarjeta de ruta</h1>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre del la Ruta</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Ruta del Queso"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
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
        </Row>

        <Button type="submit" className="mb-4">
          Agregar
        </Button>
      </Form>
      <Footer />
      </RBACWrapper>
    </div>
  );
}

export default AgregarCartaRuta;
