import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { updateFlora } from "../services/index";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function EditarFlora(){
    const { id } = useParams();

    const [flora, setFlora] = useState([]);
    let [formValues, setFormValues] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const getData = async () => {
          let promise1 = await axios.get(
            "http://159.223.174.63:4000/api/parques/flora/" + id
          );
    
          Promise.all([promise1])
            .then((values) => {
              setFlora(values[0].data);
              setFormValues(values[0].data);
            })
            .catch((e) => console.log(e));
        };
    
        const data = getData();
      }, [id]);

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
          updateFlora({ ...formValues /*, image: inputFileRef.current.files[0]*/ });
          document.location.href="/";
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };

    return(
        <div>
          <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
      <BarraNav />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1 class="h1-form">Editar Flora</h1>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre del Flora</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Bugambilia"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Ubicado en ..."
              name="imagen"
              value={formValues.imagen}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="row justify-content-between">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Informacion Importante"
              name="titulo"
              value={formValues.titulo}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              required
              type="string"
              placeholder="Informacion General"
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Listo!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit" className="mb-4">
          Guardar
        </Button>
      </Form>
      <Footer />
      </RBACWrapper>
    </div>
    );
}

export default EditarFlora;