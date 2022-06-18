import "./App.css";
import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaDeParques from "./components/ListaDeParques";
import AgregarParque from "./components/AgregarParque";
import VistaParque from "./components/VistaParque";
import CrearAnuncio from "./components/CrearAnuncio";
import AgregarCartaRuta from "./components/AgregarCartaRuta";
import EditarParque from "./components/EditarParque";
import AgregarHorario from "./components/AgregarHorario";
import AgregarFauna from "./components/AgregarFauna";
import AgregarFlora from "./components/AgregarFlora";
import FloraId from "./components/FloraId";
import FaunaId from "./components/FaunaId";
import EditarHorario from "./components/EditarHorario";
import EditarFlora from "./components/EditarFlora";
import EditarFauna from "./components/EditarFauna";
import { RBACProvider, useRBACContext } from "react-simple-rbac";
import Cookies from "js-cookie";
import axios from "axios";

const rolesMap = { 0: "usuario", 1: "admin" };
const roles = ['admin', 'usuario'];
const UserContext = React.createContext();

function App() {
  const [userInfo, setUserInfo] = useState({ name: "", email: "", role: "" });
  const [err, setError] = useState(false);

  useEffect(() => {
    const getUserInfo = () => {
      const email = Cookies.get('email');
      if (!email) {
        return;
      }

      axios.get(`http://localhost:4000/api/users/email/${email}`, {
        withCredentials: true
      })
        .then((response) => {
          if (response.data) {
            const { name, email, role } = response.data;
            setUserInfo({ name, email, role: rolesMap[role] });
          }
        }).catch((_) => setError(true));
    };

    getUserInfo();
  }, []);

  if (err) {
    return <div style={{ color: "red" }}>Hubo un problema cargando la información de usuario</div>
  }

  return (
    <UserContext.Provider value={userInfo}>
      <RBACProvider>
        <AppWrapper />
      </RBACProvider>
    </UserContext.Provider>
  );
}

const AppWrapper = () => {
  const { addRoles } = useRBACContext();
  const user = useContext(UserContext);
  addRoles([user.role]);

  return (
    <div className="App">
      <BrowserRouter roles={roles}>
        <Routes>
          <Route path="/" element={<ListaDeParques />} />
          <Route path="/agregar" element={<AgregarParque />} />
          <Route
            path="/agregartarjetaderuta/:id"
            element={<AgregarCartaRuta />}
          />
          <Route path="/parque/:id" element={<VistaParque />} />
          <Route path="/editarparque/:id" element={<EditarParque />} />
          <Route path="/editarhorario/:id" element={<EditarHorario />} />
          <Route path="/agregarhorario/:id" element={<AgregarHorario />} />
          <Route path="/editarparque" element={<EditarParque />} />
          <Route path="/agregarfauna" element={<AgregarFauna />} />
          <Route path="/agregarflora" element={<AgregarFlora />} />
          <Route path="/agregaranuncio" element={<CrearAnuncio />} />
          <Route path="/flora/:id" element={<FloraId />} />
          <Route path="/fauna/:id" element={<FaunaId />} />
          <Route path="/editFlora/:id" element={<EditarFlora />} />
          <Route path="/editFauna/:id" element={<EditarFauna />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
export const AppRoles = {
  ADMIN: 'admin',
  USER: 'usuario'
};
