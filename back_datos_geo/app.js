//IMPORTAR LIBRERIAS
const sql = require("mssql"); 
const express = require('express')
const cors = require('cors');

//CREAR EL SERVIDOR DE EXPRESS
const app = express()
const port = 3001
app.use(cors())

// CONEXION A BD
  const config = {
    server: "DESKTOP-UU6SQKM",
    port: 1433,
    user: "diana",
    password:"1234",
    database: "evaluacion",
    options:{
        // Evitar SSL
        trustServerCertificate: true
    },
    connectionTimeout: 15000,
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

// MOSTRAR ERROR EN CONEXION
sql.on('error', err =>{
    console.log(err.message)
})

// ABRIR CONEXION DE PUERTO
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.get('/getPuntos', async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let info = await pool.request().execute('dbo.getPuntos')
        sql.close
        res.json( {
            data: info.recordsets[0],
            status: true
        })
    } catch (error) {
        console.log(error.message)
        sql.close
    }

})

app.get('/getSumaZona', async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let info = await pool.request().execute('dbo.getSuma_zona')
        sql.close
        res.json({
            data: info.recordsets[0],
            status: true
        })
    } catch (error) {
        console.log(error.message)
        sql.close
    }

})

app.get('/', (req, res) => {
    res.send('APIs evaluacion')
  })
