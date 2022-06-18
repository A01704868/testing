import React, {useState, browser}from "react";
import { Container, Navbar, NavDropdown, Nav, Modal, Button } from "react-bootstrap";
import logotipo from "../assets/app-logo.svg";
import usericon from "../assets/avatar.svg";
import "../css/customStyles.css";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";
import axios from "axios";

function BarraNav() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cerrarSesion = () => {
    try {
      let response = axios.get("http://localhost:4000/api/auth/logout")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        var d = new Date();
        d.setTime(d.getTime());
        var expires = "expires="+d.toUTCString();
        document.cookie = "ExpressGeneratorTs=;domain=localhost;path=/;" + expires;
        document.cookie = "email=;domain=localhost;path=/;" + expires;

        window.location.reload();
    } catch (event) {
      console.log(event);
    }
  }


  return (
    <Navbar className="color-nav" variante="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logotipo}
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt="N/A"
          />
        </Navbar.Brand>

        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Opciones"
                menuVariant="dark"
              >
                <NavDropdown.Item href={"/agregaranuncio"}>
                  Agregar Anuncio
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </RBACWrapper>

        <Navbar.Brand onClick={handleShow}>
          <img
            src={usericon}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="N/A"
          />
        </Navbar.Brand>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Estas seguro que quieres cerrar sesion?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={cerrarSesion}>
            Si
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </Navbar>
  );
}

export default BarraNav;
