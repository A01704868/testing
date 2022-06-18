import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { saveFlora } from "../services/index";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function AgregarFlora() {
  //Validar
  const [validated, setValidated] = useState(false);
  //Axios
  const [formValues, setFormValues] = useState({
    nombre: "",
    titulo: "",
    descripcion: "",
    imagen: "",
  });

  //Validar
  const handleSubmit = (event) => {
    // console.log(formValues);
    //console.log(inputFileRef.current.files);
    //handleSubmit({ ...formValues, image: inputFileRef.current.files[0] });
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      setValidated(true);
    }

    if(validated){
      saveFlora({ ...formValues });
      document.location.href="/";
    }
  };
  //Axios
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
      <BarraNav />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 class="h1-form">Agregar Nuevo Planta</h1>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre de la Planta</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Nopal"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Esta especie solamente crece en biomas semi-aridos"
              name="titulo"
              value={formValues.titulo}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Inserta Url de imagen</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="http:...."
              name="imagen"
              value={formValues.imagen}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="El doctor Alex descubrio esta planta en las Amazonas en 1934 y se la trajo a Mexico"
              name="descripcion"
              value={formValues.descripcion}
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

export default AgregarFlora;
