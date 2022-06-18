import React from "react";
import logotipo from "../assets/app-logo.svg";
import "../css/customStyles.css";

function Footer() {
  return (
    <div className="color-nav full-width pb-4">
      <img
      src={logotipo}
      width="150"
      height="150"
      className="d-inline-block align-top"
      alt="N/A"
      />
      <p>© 2022. Todos los derechos reservados</p>
    </div>
  );
}

export default Footer;
