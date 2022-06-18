import { Alert, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ longitude, latitude }) => {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    description: "No hay datos disponibles",
    humidity: 0,
    pressure: 0,
    name: "No hay datos disponibles",
    wind: { speed: 0, deg: 0 },
  });

  useEffect(() => {
    const getWeatherForecast = () => {
      if (!latitude || !longitude) {
        return;
      }

      const weatherUrl = "http://localhost:4000/api/weather/coordinates/";
      const response = axios.post(weatherUrl, { latitude, longitude });

      response
        .then((forecast) => {
          if (forecast && forecast.data) {
            setWeatherData(forecast.data);
          }
        })
        .catch((e) => console.error(e));
    };

    getWeatherForecast();
  }, [latitude, longitude]);

  if (!longitude || !latitude) {
    return (
      <Alert variant="danger">
        No hay información disponible para las coordenadas lon:{" "}
        {longitude ?? "N/A"} - lat: {latitude ?? "N/A"}
      </Alert>
    );
  }

  return (
    <>
      {/*<h2>{weatherData.name}</h2>*/}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>Presión</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{weatherData.temp || 0}C</td>
            <td>{weatherData.humidity}% Humedad</td>
            <td>{weatherData.pressure} BAR</td>
            <td>{weatherData.description}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Weather;
