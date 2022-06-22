import React, { useState, useEffect } from "react";
import axios from "axios";
import BarraNav from "./BarraNav";
import Footer from "./Footer";
import carousel from "./Carousel";
import "../css/customStyles.css";
import "../css/styles.css";
import {
  Dropdown,
  Card,
  Row,
  Col,
  Carousel,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { deletePark } from "../services/index";
import { deleteHorario } from "../services/index";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const reverse = (arr1) => {
  const aux = [];

  for (let i = 0; i < arr1.length; i++) {
    aux.unshift(arr1[i]);
  }

  return aux;
};

const renderAbrir = (horario) => {
  return (
    <Container key={horario.id}>
      <Card.Text>
        {horario.horaAbrir} - {horario.horaCerrar} - {horario.dias}
      </Card.Text>
      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <Button
          className="link"
          variant="warning"
          onClick={() => deleteHorario(horario.id)}
        >
          Eliminar Horario
        </Button>
      </RBACWrapper>
    </Container>
  );
};

const renderCard = (card) => {
  //const url = "http://localhost:4000/api/parques/img/" + card.id;

  return (
    <Col key={card.id} style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "22rem", height: "100%" }}>
        <Card.Body>
          <Card.Title>{card.nombre}</Card.Title>
          <Card.Img src={card.imagen} className="cardImage" />
          <Card.Text>{card.descripcion}</Card.Text>
          Direccion
          <Card.Text>{card.direccion}</Card.Text>
          Horarios
          {card.horario.map(renderAbrir)}
        </Card.Body>
        <Button className="link" variant="primary" href={"/parque/" + card.id}>
          Mas Informacion
        </Button>
        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
          <Button
            className="link"
            variant="secondary"
            href={"/editarparque/" + card.id}
          >
            Editar
          </Button>
          <Button
            className="link"
            variant="danger"
            onClick={() => deletePark(card.id)}
          >
            Eliminar
          </Button>
        </RBACWrapper>
      </Card>
    </Col>
  );
};

const renderDropdown = (activity) => {
  return (
    <Dropdown.Item eventKey={activity.id} key={activity.id} href="#/action-1">
      {activity.nombre}
    </Dropdown.Item>
  );
};

let color = "info";
let icon = "caret-down-outline";
let toggle = 0;

function ListaDeParques() {

  const [parques, setParques] = useState([]);
  const [searchTerm, setSearch] = useState("");
  const [activityButton, setActivityButton] = useState([]);
  const [searchActivity, setSearchActivity] = useState(0);
  const [calcDistance, setCalcDistance] = useState(false);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  //investigate reducer in react manual

  useEffect(() => {

    function getPosition(position) {
      //const URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+position.coords.latitude + ',' + position.coords.longitude + '&destinations=' + 20.53484996215969 + ',' + -100.3577293854862 + '&key=AIzaSyBa_nu7n2b5Gs_J2YPiSSCKnKD-ZsdD0YA';

      setLatitud(position.coords.latitude);
      setLongitud(position.coords.longitude);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition)
    } else {
      console.log("geolocation not available");
    }

    const getData = () => {
      let promise1 = axios.get("http://localhost:4000/api/parques");

      let promise2 = axios.get("http://localhost:4000/api/parques/activity");

      Promise.all([promise1, promise2])
        .then(values => { setParques(values[0].data); setActivityButton(values[1].data); })
        .catch(e => console.log(e))
    }

    getData();

    parques.forEach(parque => parque.superficieMarina = distance(latitud, longitud, parque.latitud, parque.longitud));
    // eslint-disable-next-line
  }, []);

  const cardOrder = () => {
    if (toggle === 0) {
      icon = "caret-up-outline";
      toggle = 1;
    } else {
      icon = "caret-down-outline";
      toggle = 0;
    }
    setParques(reverse(parques));

  }

  //Haversine algorithm
  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  function toggleDistance() {
    if (calcDistance === true) {
      setCalcDistance(false);
      color = 'info';
    } else {
      setCalcDistance(true);
      color = 'secondary';
    }
  }

  return (
    <div>
      <BarraNav />
      <Carousel>
        {[...parques].sort((a, b) => {
          if (a.clicks > b.clicks) {
            return -1;
          }

          if (a.clicks < b.clicks) {
            return 1;
          }

          return 0;
        }).slice(0, 3).map(carousel)}
      </Carousel>

      <h1>Encuentra Parques filtrando por Actividad</h1>

      <Container className="pb-4">
        <Row>
          <Col>
            <button type="button" className="arrow" onClick={() => cardOrder()}>
              <span>
                <ion-icon name={icon}></ion-icon>
              </span>
            </button>
          </Col>
          <Col>
            <Button variant={color} onClick={toggleDistance}>Cual parque esta mas cerca a mi?</Button>
          </Col>
          <Col>

            <InputGroup className="mb-3">
              <FormControl onChange={(event) => { setSearch(event.target.value) }}
                placeholder="Busqueda"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2"><ion-icon name="search-outline" size="large"></ion-icon></InputGroup.Text>
            </InputGroup>

          </Col>
          <Col>
            <Dropdown className="drop" onSelect={(eventKey, event) => { setSearchActivity(eventKey); }}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Actividades
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="0" href="#/action-1">Todos</Dropdown.Item>
                {activityButton.map(renderDropdown)}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
      
      <Row className="m-5 g-4">
        {// eslint-disable-next-line
          parques.filter((parque) => {

            let result = true;

            if (searchTerm !== "") {
              result = result && parque.nombre.toLowerCase().includes(searchTerm.toString().toLowerCase())
            }
            if (calcDistance !== false) {
              parques.sort((parque1, parque2) => {
                if (parque1.superficieMarina > parque2.superficieMarina) {
                  return 1;
                }
                if (parque1.superficieMarina < parque2.superficieMarina) {
                  return -1;
                }

                return 0;
              });
            }
            // eslint-disable-next-line
            if (searchActivity != 0) {
              let index = parque.actividades.findIndex((activity) => {
                // eslint-disable-next-line
                return (activity.actividadId == searchActivity);
              });

              result = result && (index !== -1);
            }

            return result;

          }).map(renderCard)}
      </Row>
      <div id="boton">
        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
          <Button className="crear" type="submit" variant="success" href={"/agregar"} style={{ position: "fixed", top: "95%", width: "20vw", left: "calc(50% - 10vw)" }}>
            Agregar
          </Button>
        </RBACWrapper>
      </div>

      <Footer />
    </div>
  );
}

export default ListaDeParques;

//ver el hook de useContext
//usar react-router-dom v6
//investigar lo de los providers
//no usar redux

//atomic design
