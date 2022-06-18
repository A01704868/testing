import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const contactoUrl = "http://159.223.174.63:4000/api/encargado";
const agregarContacto = (encargado, onClose) => {
    if (!encargado) {
        return;
    }

    axios.post(`${contactoUrl}/create`, encargado)
        .then(onClose)
        .catch(onClose);
}

const ContactoAgregar = ({ parqueId, mostrarForma, onClose }) => {
    const guardarContacto = (event) => {
        const [nombreField, telefonoField] = event.target;
        const nombre = nombreField.value ?? "";
        const telefono = telefonoField.value ?? "";

        if (parqueId === null || parqueId === undefined) {
            return;
        }
        if (!nombre || !telefono) {
            return;
        }

        const contactoAdded = { encargado: { parqueId, nombre, telefono } };
        agregarContacto(contactoAdded, onClose);
        event.preventDefault();
    };

    return (
        <Modal show={mostrarForma} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Agregar Contacto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {renderForm(guardarContacto, onClose)}
            </Modal.Body>
        </Modal>
    );

};

const renderForm = (guardarContacto, onClose) => {
    return (
        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <Form onSubmit={guardarContacto}>
            <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="name" placeholder="Nuevo Nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="number" placeholder="442-987-6677" />
            </Form.Group>

            <Button variant="primary" type="submit" value="submit" style={{ margin: "0.5rem" }}>
                Agregar
            </Button>
            <Button variant="secondary" onClick={onClose}>
                Cerrar
            </Button>
        </Form>
        </RBACWrapper>
    );
}

export default ContactoAgregar;



