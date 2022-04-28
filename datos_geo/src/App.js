import {  Box, Tabs, Tab, Typography } from "@mui/material";
import React,{useState, useEffect} from "react";
import './App.css';
import Grafico from "./Grafico";
import Mapa from './Map';

function App() {
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([]);

  const handleChange = (even, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetch("http://api.openweathermap.org/data/2.5/weather?id=3527646&lang=en&units=metric&lang=sp&APPID=15ac59375109229f1e4393cb5ed8959f")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Datos Geográficos" />
          <Tab label="Gráfico "  />
          <div><Typography align="justify">{items?.main?.temp} °C {items.name}, {items?.sys?.country}</Typography></div>
        </Tabs>
      </Box>

       {value === 0 && <Mapa />}
       {value === 1 && <Grafico/> }
    </Box>
  );
}

export default App;
