import axios from "axios";
const baseUrl = "http://159.223.174.63:4000/api";

export async function savePark(parque) {
  console.log("ORE: ", parque);
  try {
    const formData = new FormData();
    console.log(parque);

    formData.append("nombre", parque.nombre);
    formData.append("descripcion", parque.descripcion);
    formData.append("imagen", parque.image);
    formData.append("direccion", parque.direccion);
    formData.append("latitud", parque.latitud);
    formData.append("longitud", parque.longitud);
    formData.append("fechaDecreto", parque.fechaDecreto);
    formData.append("superficieTerrestre", parque.superficieTerrestre);
    formData.append("superficieMarina", parque.superficieMarina);

    /*let response = await axios.post("http://localhost:4000/api/addparques", {
      parkData,
    });*/

    let response = axios
      .post("http://159.223.174.63:4000/api/addparques", {
        parque: parque,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /*const response = await axios({
      url: `${baseUrl}"/addparques/`,
      method: "POST",
      data: parkData,
    });*/
    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function saveCart(cartaruta) {
  console.log("ORE: ", cartaruta);
  try {
    const formData = new FormData();
    console.log(cartaruta.parqueid);

    formData.append("nombre", cartaruta.nombre);
    formData.append("descripcion", cartaruta.descripcion);
    formData.append("parqueId", cartaruta.parqueId);

    let response = axios
      .post("http://159.223.174.63:4000/api/addcartaruta/", {
        cartaruta: cartaruta,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //const response = await axios({
    //url: `${baseUrl}"/addparques/`,
    //method: "POST",
    //data: parkData,
    //});
    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function deletePark(parkId) {
  try {
    let response = axios
      .delete(`${baseUrl}/deleteparque/${parkId}`, {
        id: parkId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //return response;
  } catch (event) {
    console.log(event);
  }

  document.location.href="/";
}

export async function updateFauna(fauna) {
  try {
    let response = axios
      .put(`${baseUrl}/editFauna/${fauna.id}`, {
        id: fauna.id,
        nombre: fauna.nombre,
        imagen: fauna.imagen,
        titulo: fauna.titulo,
        descripcion: fauna.descripcion,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function updatePark(park) {
  try {
    console.log("ID: ", park.id);
    let response = axios
      .put(`${baseUrl}/editParque/${park.id}`, {
        id: park.id,
        nombre: park.nombre,
        descripcion: park.descripcion,
        imagen: park.imagen,
        direccion: park.direccion,
        latitud: park.latitud,
        longitud: park.longitud,
        fechaDecreto: park.fechaDecreto,
        superficieTerrestre: park.superficieTerrestre,
        superficieMarina: park.superficieMarina,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function updateFlora(flora) {
  try {
    let response = axios
      .put(`${baseUrl}/editFlora/${flora.id}`, {
        id: flora.id,
        nombre: flora.nombre,
        imagen: flora.imagen,
        titulo: flora.titulo,
        descripcion: flora.descripcion,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function saveHorario(horario) {
  console.log("ORE: ", horario);
  try {
    const formData = new FormData();
    console.log(horario.parqueid);

    formData.append("dias", horario.dias);
    formData.append("horaAbrir", horario.horaAbrir);
    formData.append("horaCerrar", horario.horaCerrar);
    formData.append("parqueId", horario.parqueId);

    let response = axios
      .post("http://159.223.174.63:4000/api/addhorario/", {
        horario: horario,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //const response = await axios({
    //url: `${baseUrl}"/addparques/`,
    //method: "POST",
    //data: parkData,
    //});
    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function deleteHorario(horarioId) {
  try {
    let response = axios
      .delete(`${baseUrl}/deletehorario/${horarioId}`, {
        id: horarioId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function deleteAnuncio(anuncioId) {
  try {
    let response = axios
      .delete(`${baseUrl}/deleteanuncio/${anuncioId}`, {
        id: anuncioId,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function saveFauna(fauna) {
  console.log("ORE: ", fauna);
  try {
    const formData = new FormData();
    console.log(fauna);

    formData.append("nombre", fauna.nombre);
    formData.append("descripcion", fauna.descripcion);
    formData.append("imagen", fauna.image);
    console.log("Buscando: ", fauna);
    /*let response = await axios.post("http://localhost:4000/api/addparques", {
      parkData,
    });*/

    let response = axios
      .post("http://159.223.174.63:4000/api/addfauna", {
        fauna: fauna,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /*const response = await axios({
      url: `${baseUrl}"/addparques/`,
      method: "POST",
      data: parkData,
    });*/
    return response;
  } catch (event) {
    console.log(event);
  }
}

export async function saveFlora(flora) {
  console.log("ORE: ", flora);
  try {
    const formData = new FormData();
    console.log(flora);

    formData.append("nombre", flora.nombre);
    formData.append("descripcion", flora.descripcion);
    formData.append("imagen", flora.image);
    console.log("Buscando: ", flora);
    /*let response = await axios.post("http://localhost:4000/api/addparques", {
      parkData,
    });*/

    let response = axios
      .post("http://159.223.174.63:4000/api/addflora", {
        flora: flora,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /*const response = await axios({
      url: `${baseUrl}"/addparques/`,
      method: "POST",
      data: parkData,
    });*/
    return response;
  } catch (event) {
    console.log(event);
  }
}
export async function saveAnuncio(anuncio) {
  console.log("ORE: ", anuncio);
  try {
    const formData = new FormData();
    console.log(anuncio.parqueid);

    formData.append("descripcion", anuncio.descripcion);
    formData.append("parqueId", anuncio.parqueId);

    let response = axios
      .post("http://159.223.174.63:4000/api/addanuncio/", {
        anuncio: anuncio,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    //const response = await axios({
    //url: `${baseUrl}"/addparques/`,
    //method: "POST",
    //data: parkData,
    //});
    return response;
  } catch (event) {
    console.log(event);
  }
}
