import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const usuarioUrl = "http://localhost:4000/api/users";
const editarUsuario = (usuario, onClose) => {
    if (!usuario) {
        return;
    }

    axios.put(`${usuarioUrl}/update`, usuario, { withCredentials: true })
        .then((_) => onClose())
        .catch((_) => onClose());
}

const UsuarioEditar = ({ userData, mostrarForma, onClose }) => {
    const [nombre, setNombre] = useState(userData.name || "");
    const [email, setEmail] = useState(userData.email || "");
    const [role, setRole] = useState(userData.role || "");

    const guardarCambios = (event) => {
        if (!nombre || !email || !role) {
            return;
        }

        const usuarioUpdated = {
            user: {
                ...userData,
                nombre,
                email,
                role
            }
        };

        editarUsuario(usuarioUpdated, onClose);
        event.preventDefault();
    };

    if (!userData) {
        return null;
    }

    return (
        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <Modal show={mostrarForma} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={guardarCambios}>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="name"
                            onChange={({ target }) => setNombre(target.value)}
                            placeholder="Nuevo Nombre"
                            value={nombre}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="ejemplo@gmail.com"
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select value={role} onChange={({ target }) => setRole(target.value)}>
                            <option value={0}>USER</option>
                            <option value={1}>ADMIN</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" value="submit" style={{ margin: "0.5rem" }}>
                        Actualizar
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Cerrar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </RBACWrapper>
    );
};

export default UsuarioEditar;



