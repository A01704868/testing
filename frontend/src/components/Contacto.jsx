import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Alert, Table, Modal, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import ContactoEditar from "./ContactoEditar";
import ContactoAgregar from "./ContactoAgregar";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const contactoUrl = "http://localhost:4000/api/encargado";

const Contacto = ({ id }) => {
  const [contactoData, setContactoData] = useState({
    id: undefined,
    nombre: "No hay datos disponibles",
    telefono: "No hay datos disponibles",
    parqueId: undefined,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [contactoWasUpdated, setContactoWasUpdated] = useState(false);

  useEffect(() => {
    const getContacto = () => {
      if (id === null || id === undefined) {
        return;
      }

      axios
        .get(`${contactoUrl}/read/${id}`)
        .then((encargado) => {
          if (encargado && encargado.data) {
            setContactoData(encargado.data);
          }
        })
        .catch((e) => console.error(e));
    };

    getContacto();
  }, [id, contactoWasUpdated]);

  if (id === null || id === undefined) {
    return <Alert variant="danger">No hay información disponible</Alert>;
  }

  const onDelete = () => {
    setIsDialogOpen(false);
    setContactoData({
      id: undefined,
      nombre: "No hay datos disponibles",
      telefono: "No hay datos disponibles",
      parqueId: 0,
    });
  };

  const onEditClosed = () => {
    setEditIsOpen(false);
    setContactoWasUpdated(!contactoWasUpdated);
  };

  const onAddClosed = () => {
    setAddIsOpen(false);
    setContactoWasUpdated(!contactoWasUpdated);
  };

  return (
    <>
      <h2>Contacto</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
              <th>Borrar</th>
              <th>Editar</th>
              <th>Agregar</th>
            </RBACWrapper>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{contactoData.nombre}</td>
            <td>{contactoData.telefono}</td>
            <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
              <td>
                <Icon.Trash
                  color={contactoData.id ? "red" : "grey"}
                  title="Borrar Contacto"
                  style={{ cursor: contactoData.id ? "pointer" : "initial" }}
                  onClick={() => contactoData.id && setIsDialogOpen(true)}
                />
              </td>
              <td>
                <Icon.PencilFill
                  title="Editar Contacto"
                  color={contactoData.id ? "black" : "grey"}
                  style={{ cursor: contactoData.id ? "pointer" : "initial" }}
                  onClick={() => contactoData.id && setEditIsOpen(true)}
                />
              </td>
              <td>
                <Icon.PlusCircle
                  color={contactoData.id ? "grey" : "green"}
                  title="Agregar Contacto"
                  style={{ cursor: contactoData.id ? "initial" : "pointer" }}
                  onClick={() => !contactoData.id && setAddIsOpen(true)}
                />
              </td>
            </RBACWrapper>
          </tr>
        </tbody>
      </Table>
      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <DialogoBorrar
          id={contactoData.id}
          isOpen={isDialogOpen}
          onCancel={() => setIsDialogOpen(false)}
          onDelete={onDelete}
        />
        <ContactoEditar
          idContacto={contactoData.id}
          mostrarForma={editIsOpen}
          onClose={onEditClosed}
        />
        <ContactoAgregar
          parqueId={id}
          mostrarForma={addIsOpen}
          onClose={onAddClosed}
        />
      </RBACWrapper>
    </>
  );
};

/**
 * Component para borrar un contacto
 * @param {number} id ID del contacto a borrar
 * @param {boolean} isOpen Bandera para abrir o cerrar el diálogo
 * @callback onCancel Funcion que ejecutar al cancelar la acción de borrar
 * @callback onDelete Funcion que ejecutar al borrar el contacto correctamente
 */
const DialogoBorrar = ({ id, isOpen, onCancel, onDelete }) => {
  const borrarContacto = () => {
    if (id === null || id === undefined) {
      return;
    }

    axios
      .delete(`${contactoUrl}/delete/${id}`)
      .then((_) => { onDelete && onDelete(); })
      .catch((err) => alert(err));
  };

  if (!isOpen || id === undefined || id === null) {
    return null;
  }

  return (
    <Modal.Dialog style={{ zIndex: 900, boxShadow: "4px 4px 4px grey" }}>
      <Modal.Header>
        <Modal.Title>Borrar Contacto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Estás seguro que quieres borrar el contacto?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onCancel && onCancel()}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={borrarContacto}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default Contacto;
