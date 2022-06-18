import React from "react";
import Navbar from "./BarraNav";
import Footer from "./Footer";
import Weather from "./Weather";
import Contacto from "./Contacto";
import Usuario from "./Usuario";
import "../css/styles.css";
import Anuncio from "./Anuncio";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Carousel,
  Container,
  Dropdown,
} from "react-bootstrap";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    if (!center || !zoom) {
      return;
    }

    new window.google.maps.Map(ref.current, { center, zoom });
  });

  return <div ref={ref} id="map" />;
}

function activityList(actividad) {
  return (
    <Container key={actividad.id}>
      <p>{actividad.nombre}</p>
    </Container>
  );
}

function activityImgList(imagen) {
  return (
    <Carousel.Item>
      <img className="d-block w-100" src={imagen.imagen} alt="Error al cargar img"/>
    </Carousel.Item>
  );
}

function faunaListImg(fauna) {
  const url = "/fauna/" + fauna.id;
  return (
    <Carousel.Item>
      <a href={url}>
        <img className="d-block w-100 img-flora" src={fauna.imagen} alt="Error al cargar img"></img>
      </a>
    </Carousel.Item>
  );
}

function floraListImg(flora) {
  const url = "/flora/" + flora.id;
  return (
    <Carousel.Item key={flora.id}>
      <a href={url}>
        <img className="d-block w-100 img-flora" src={flora.imagen} alt="Error al cargar img"></img>
      </a>
    </Carousel.Item>
  );
}

function VistaParque() {
  const { id } = useParams();

  const [parque, setParque] = useState({});
  const [anuncios, setAnuncios] = useState([]);
  const [abrir, setAbrir] = useState("");
  const [cerrar, setCerrar] = useState("");
  const [dias, setDias] = useState("");
  const [actividades, setActivity] = useState([]);
  const [activityImg, setImgActivity] = useState([]);
  const [fauna, setFauna] = useState([]);
  const [flora, setFlora] = useState([]);

  useEffect(() => {
    const getData = () => {
      let promise1 = axios.get(
        "http://159.223.174.63:4000/api/parques/parque/" + id
      );

      let promise2 = axios.get(
        "http://159.223.174.63:4000/api/parques/pActivities/" + id
      );

      let promise3 = axios.get(
        "http://159.223.174.63:4000/api/parques/activityImg/" + id
      );

      let promise4 = axios.get(
        "http://159.223.174.63:4000/api/parques/parkFauna/" + id
      );

      let promise5 = axios.get(
        "http://159.223.174.63:4000/api/parques/parkFlora/" + id
      );

      Promise.all([promise1, promise2, promise3, promise4, promise5])
        .then((values) => {
          setParque(values[0].data);
          setAnuncios(values[0].data.anuncios);
          setAbrir(values[0].data.horario[0].horaAbrir);
          setCerrar(values[0].data.horario[0].horaCerrar);
          setDias(values[0].data.horario[0].dias);
          setActivity(values[1].data);
          setImgActivity(values[2].data);
          setFauna(values[3].data);
          setFlora(values[4].data);
        })
        .catch((e) => console.log(e));
    };

    getData();
  }, [id]);
  //const url = "http://localhost:4000/api/parques/img/" + parque.id;

  const center = { lat: parque.latitud, lng: parque.longitud };
  const zoom = 15;
  const height = 600;
  const visitar = "https://www.google.com/maps/place/" + parque.direccion;

  return (
    <div>
      <Navbar />
      {anuncios.map((e) => (
        <Anuncio
          id={e.id}
          descripcion={e.descripcion}
          titulo={e.titulo}
          variante={e.variante}
        />
      ))}
      <Carousel>
        <Carousel.Item className="carousel-hero">
          <img
            className="d-block w-100"
            src={parque.imagen}
            alt="First slide"
          />
          <Carousel.Caption className="caption">
            <h3>{parque.nombre}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="row-hero">
        <Card style={{ width: "100%" }} className="pb-4">
          <Wrapper
            apiKey="AIzaSyBa_nu7n2b5Gs_J2YPiSSCKnKD-ZsdD0YA"
            render={render}
          >
            <MyMapComponent center={center} zoom={zoom} height={height} />
          </Wrapper>
          <Card.Body className="row-info-card">
            <div className="col-3">
              <Card.Title>HORARIO</Card.Title>
              <Card.Text>{dias}</Card.Text>
              <Card.Text>
                {abrir} - {cerrar}
              </Card.Text>
            </div>
            <div className="col-3">
              <Card.Title>UBICACIÓN</Card.Title>
              <Card.Text>{parque.direccion}</Card.Text>
            </div>
          </Card.Body>

          <Card.Body>
            <Button className="mt-5" href={visitar}>
              ¿CÓMO LLEGAR?
            </Button>
          </Card.Body>

          <Dropdown>
          <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Agregar
            </Dropdown.Toggle>
          </RBACWrapper>

            <Dropdown.Menu>
              <Dropdown.Item href={"/agregarfauna"}>Fauna</Dropdown.Item>
              <Dropdown.Item href={"/agregarflora"}>Flora</Dropdown.Item>
              <Dropdown.Item href={"/agregartarjetaderuta/" + id}>
                Tarjeta de Ruta
              </Dropdown.Item>
              <Dropdown.Item href={"/agregarhorario/" + id}>
                Agregar Horario
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Card>
      </Container>

      <Weather
        style={{ padding: "1rem" }}
        latitude={parque.latitud}
        longitude={parque.longitud}
      />
      <Contacto style={{ padding: "1rem" }} id={parque.id} />
      <Usuario style={{ padding: "1rem" }} />

      <div className="mt-16 activities">
        <h1 className="mb-3"> ACTIVIDADES </h1>
        <div className="row-activities">
          <div className="col-6 pt-5 col-custom">
            <p>{actividades.map(activityList)}</p>
          </div>
          <div className="col-6 pt-5">
            <Carousel>{activityImg.map(activityImgList)}</Carousel>
          </div>
        </div>
      </div>

      <div className="mt-16 pb-4">
        <h1 className="mb-3"> FLORA Y FAUNA </h1>
        <div className="row-info-card">
          <div className="col-6">
            <h2 className="mb-3"> FLORA </h2>
            <Carousel className="car-center">
              {flora.map(floraListImg)}
            </Carousel>
          </div>
          <div className="col-6">
            <h2 className="mb-3"> FAUNA </h2>
            <Carousel className="car-center">
              {fauna.map(faunaListImg)}
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VistaParque;
