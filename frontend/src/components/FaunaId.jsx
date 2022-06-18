import React from "react";
import Navbar from "./BarraNav";
import Footer from "./Footer";
import "../css/styles.css";
//import { useParams } from "react-router-dom";
//import { Card, Button, Carousel, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Carousel, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function faunaListImg(fauna) {
  return (
    <Carousel.Item>
      <img className="d-block w-100 img-flora" src={fauna.imagen}></img>
    </Carousel.Item>
  );
}

function FaunaId() {
  const { id } = useParams();

  const [fauna, setFauna] = useState([]);

  useEffect(() => {
    const getData = () => {
      let promise1 = axios.get("http://localhost:4000/api/parques/fauna/" + id);

      Promise.all([promise1])
        .then((values) => {
          setFauna(values[0].data);
        })
        .catch((e) => console.log(e));
    };
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="full-width mt-4">
        <img className="hero-img-flora img-fauna pb-4" src={fauna.imagen} />
        <div>
          <h1>{fauna.nombre}</h1>
        </div>
      </div>
      <Container className="pb-4">
        <h2>{fauna.titulo}</h2>
        <div className="pb-4"></div>
        {/*<div className="row-info-card">
          <div className="col-6 col-custom">
            <p className="mb-3">{fauna.descripcion}</p>
          </div>
          <div className="col-6">
          <img
            className="size-fixed pb-4"
            src= {fauna.imagen}
          />
          </div>
        </div>*/}
        <p className="mb-3">{fauna.descripcion}</p>
      </Container>

      <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <Button
          className="link"
          variant="secondary"
          href={"/editFauna/" + fauna.id}
        >
          Editar
        </Button>
        </RBACWrapper>

      <Footer />
    </div>
  );
}
export default FaunaId;
