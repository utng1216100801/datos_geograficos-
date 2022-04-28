import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function Grafico() {
  const [datos, setDatos] = useState([]);
  const getSumaZona = async (event) => {
    axios.get("http://127.0.0.1:3001/getSumaZona")
      .then((response) => {
        if(response.data.status)
          setDatos([["Zona","Suma total"],...response.data.data.map(dato => [dato.zona, dato.total_zona])]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(datos);

  useEffect(() => {
    getSumaZona();
  }, []);
  return (
    <div>
      <Chart
        chartType="PieChart"
        data={datos}
        options={{
          title: "Suma de venta por zona",
        }}
        width={"100vw"}
        height={"100vh"}
      />
    </div>
  );
}

export default Grafico;
