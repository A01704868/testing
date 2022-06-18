import axios from "axios";
import BarraNav from './BarraNav';
import Footer from './Footer';
import React, {useState, useEffect} from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';
import { RBACWrapper } from "react-simple-rbac";
import { AppRoles } from "../App";

function dynamoOpt(parque){
    return (
        <option value={parque.id}>{parque.nombre}</option>
    );
}

function CrearAnuncio(){

    const [parques, setParques] = useState([]);

    useEffect(() => {
    
        const getData = () => {
          let promise1 = axios.get("http://159.223.174.63:4000/api/parques");
    
          Promise.all([promise1])
            .then((values) => {
              setParques(values[0].data);
            })
            .catch((e) => console.log(e));
        };
    
        getData();
        // eslint-disable-next-line
      }, []);

    //state variable
    const [data, setData] = useState({
        titulo: "",
        descripcion: "",
        variante: "",
        parqueId: ""
    });

    const navigate = useNavigate();

    async function submit(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://159.223.174.63:4000/api/parques/anuncio', {
                titulo: data.titulo,
                descripcion: data.descripcion,
                variante: data.variante,
                parqueId: data.parqueId
            });
            console.log(response.data);
        }catch(error){
            console.log(error.response);
        }

        navigate('/');
    }

    function handle(e){
        const newData={...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }
    return (
        <>
        <RBACWrapper requiredRoles={[AppRoles.ADMIN]}>
        <BarraNav />

        <h1 class="h1-form">Agregar Anuncio</h1>
        <Form onSubmit={(e)=>submit(e)}>
        <Form.Group className="mb-3">
            <Form.Label>Titulo</Form.Label>
            <Form.Control required onChange={(e) => handle(e)} value={data.titulo} id="titulo" type="text" placeholder="Titulo del Anuncio" />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control required as="textarea" rows={3} onChange={(e) => handle(e)} value={data.descripcion} id="descripcion" type="text" placeholder="Descripcion detallada" />
        </Form.Group>

        <Form.Select required aria-label="Default select example" onChange={(e) => handle(e)} value={data.variante} id="variante">
            <option>Elige opcion de anuncio</option>
            <option value="success">Notificacion</option>
            <option value="danger">Alerta</option>
            <option value="warning">Advertencia</option>
        </Form.Select>

        <br/>

        <Form.Select required aria-label="Default select example" onChange={(e) => handle(e)} value={data.parqueId} id="parqueId">
            <option>Elige un parque a cual mandarle el anuncio</option>
            {parques.map(dynamoOpt)}
        </Form.Select>


        <Button variant="primary" type="submit" className="mb-4">
            Submit
        </Button>
        </Form>
        <Footer/>
        </RBACWrapper>
        </>
    );
}


export default CrearAnuncio;
