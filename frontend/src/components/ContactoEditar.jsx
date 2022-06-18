import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const contactoUrl = "http://localhost:4000/api/encargado";
const editarContacto = (encargado, onClose) => {
  if (!encargado) {
    return;
  }

  axios.put(`${contactoUrl}/update`, encargado)
    .then((_) => onClose())
    .catch((_) => onClose());
}

const ContactoEditar = ({ idContacto, mostrarForma, onClose }) => {
  const guardCambios = (event) => {
    const [nombreField, telefonoField] = event.target;
    const nombre = nombreField.value ?? "";
    const telefono = telefonoField.value ?? "";

    if (idContacto === null || idContacto === undefined) {
      return;
    }
    if (!nombre || !telefono) {
      return;
    }

    const contactoUpdated = { encargado: { id: idContacto, nombre, telefono } };
    editarContacto(contactoUpdated, onClose);
    event.preventDefault();
  };

  return (
    <Modal show={mostrarForma} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Editar Contacto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {renderForm(guardCambios, onClose)}
      </Modal.Body>
    </Modal>
  );

};

const renderForm = (guardCambios, onClose) => {
  return (
    <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
    <Form onSubmit={guardCambios}>
      <Form.Group className="mb-3" controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="name" placeholder="Nuevo Nombre" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelefono">
        <Form.Label>Telefono</Form.Label>
        <Form.Control type="number" placeholder="442-987-6677" />
      </Form.Group>

      <Button variant="primary" type="submit" value="submit" style={{ margin: "0.5rem" }}>
        Actualizar
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cerrar
      </Button>
    </Form>
    </RBACWrapper>
  );
}

export default ContactoEditar;



