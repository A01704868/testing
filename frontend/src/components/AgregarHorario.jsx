import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { saveHorario } from "../services/index";
import { useParams } from "react-router-dom";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function AgregarHorario() {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    dias: "",
    horaAbrir: "",
    horaCerrar: "",
    parqueId: id,
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
      saveHorario({ ...formValues });
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
        <h1 class="h1-form">Agregar Horario</h1>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Dias</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Lunes a Domingo"
              name="dias"
              value={formValues.dias}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Hora de abrir</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="10:05"
              name="horaAbrir"
              value={formValues.horaAbrir}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Hora de Cerrar</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="20:00"
              name="horaCerrar"
              value={formValues.horaCerrar}
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

export default AgregarHorario;
