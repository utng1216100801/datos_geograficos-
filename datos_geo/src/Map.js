import axios from "axios";
import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import tiendas from "./datos/tiendas.json";

function Mapa() {
  const [ntiendas, setTiendas] = useState([]);
  const getPuntos = async (event) => {
    axios.get("http://127.0.0.1:3001/getPuntos")
      .then((response) => {
        if(response.data.status)
          setTiendas(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPuntos();
  }, []);
  return (
    <div>
      <MapContainer
        center={[19.48819, -99.13284]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ntiendas.map((tienda) => (
          <Marker key={tienda.id} position={[tienda.latitud, tienda.longitud]}>
            <Popup>
              ID: {tienda.id} <br />
              DESCRIPCIÓN: {tienda.descripcion} <br />
              ZONA: {tienda.zona} <br />
              VENTA: {tienda.venta} <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      ,
    </div>
  );
}

export default Mapa;
