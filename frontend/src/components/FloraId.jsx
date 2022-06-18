import React from "react";
import Navbar from "./BarraNav";
import Footer from "./Footer";
import "../css/styles.css";
//import { useParams } from "react-router-dom";
//import { Card, Button, Carousel, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function FloraId() {

  const { id } = useParams();

  const [flora, setFlora] = useState([]);

  useEffect(() => {
    const getData = () => {
      let promise1 = axios.get(
        "http://159.223.174.63:4000/api/parques/flora/" + id
      );

      Promise.all([promise1])
      .then(values => {
        setFlora(values[0].data);
      })
      .catch((e) => console.log(e));
    };
    getData();
  }, [id]);
  console.log(flora)

  return(
    <div>
      <Navbar />
      <div className="full-width mt-4">
        <img
          className="hero-img-flora img-fauna pb-4"
          src= {flora.imagen}
          alt="Error al cargar la imagen"
        />
        <div>
          <h1>{flora.nombre}</h1>
        </div>
      </div>
      <Container className="pb-4">
        <h2>{ flora.titulo }</h2>
        <div className="pb-4"></div>
        {/*<div className="row-info-card">
          <div className="col-6 col-custom">
            <p className="mb-3">{flora.descripcion}</p>
          </div>
          <div className="col-6">
          <img
            className="size-fixed pb-4"
            src= {flora.imagen}
          />
          </div>
        </div>*/}
        <p className="mb-3">{flora.descripcion}</p>
      </Container>

      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <Button
            className="link"
            variant="secondary"
            href={"/editFlora/" + flora.id}
          >
            Editar
          </Button>
        </RBACWrapper>
      <Footer />
    </div>
  );

}
export default FloraId;
