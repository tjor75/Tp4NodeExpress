import express  from 'express'; // hacer npm i express
import cors     from 'cors';    // hacer npm i cors
import Alumno from './models/alumno.js';
import {sumar, restar, multiplicar, dividir} from './modules/matematica.js';
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from './modules/omdb-wrapper.js';

const app  = express();
const port = 3000;              // El puerto 3000 (http://localhost:3000)
const alumnosArray = [];

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//
// Endpoints comunes
//
app.get('/', (req, res) => {                // EndPoint '/'
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar/:nombre', (req, res) => {             // EndPoint "/saludar"
    if (req.params.nombre !== undefined)
        res.send(`Hola ${req.params.nombre}`);
    else
        res.sendStatus(400);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    if (req.params.ano !== undefined &&
        req.params.mes !== undefined &&
        req.params.dia !== undefined &&
        !isNaN(Date.parse(`${req.params.mes}/${req.params.dia}/${req.params.ano}`)))
        res.sendStatus(200);
    else
        res.sendStatus(400);
})

//
// Endpoints que reutilizan el módulo matemática.js
//
app.get('/matematica/sumar', (req, res) => {
    const resultado = sumar(Number(req.query.n1), Number(req.query.n2));

    if (!isNaN(resultado))
        res.send(resultado);
    else
        res.sendStatus(400);
})

app.get('/matematica/restar', (req, res) => {
    const resultado = restar(Number(req.query.n1), Number(req.query.n2));

    if (!isNaN(resultado))
        res.send(resultado);
    else
        res.sendStatus(400);
})

app.get('/matematica/multiplicar', (req, res) => {
    const resultado = multiplicar(Number(req.query.n1), Number(req.query.n2));

    if (!isNaN(resultado))
        res.send(resultado);
    else
        res.sendStatus(400);
})

app.get('/matematica/dividir', (req, res) => {
    const n1 = Number(req.query.n1);
    const n2 = Number(req.query.n2);

    if (!isNaN(n1) && !isNaN(n2))
        if (n2 !== 0)
            res.send(dividir(n1, n2));
        else
            res.status(400).send("El divisor no puede ser cero");
    else
        res.sendStatus(400);
})

//
// Endpoints que reutilizan el módulo omdb-wrapper.js
//
app.get('/omdb/searchbypage', async (req, res) => {
    const page = parseInt(req.query.p) ?? 1;
    let returnObject;

    if (req.query.search !== undefined) {
        returnObject = await OMDBSearchByPage(req.query.search, page);
        res.status(returnObject.respuesta ? 200 : 404).json(returnObject);
    } else {
        res.status(400).json({
            respuesta : false,
            cantidadTotal : 0,
            datos : []
        });
    }
})

app.get('/omdb/searchcomplete', async (req, res) => {
    let returnObject;

    if (req.query.search !== undefined) {
        returnObject = await OMDBSearchComplete(req.query.search);
        res.status(returnObject.respuesta ? 200 : 404).json(returnObject);
    } else {
        res.status(400).json({
            respuesta : false,
            cantidadTotal : 0,
            datos : []
        });
    }
})

app.get('/omdb/getbyomdbid', async (req, res) => {
    let returnObject;

    if (req.query.imdbID !== undefined) {
        returnObject = await OMDBGetByImdbID(req.query.imdbID);
        res.status(returnObject.respuesta ? 200 : 404).json(returnObject);
    } else {
        res.status(400).json({
            respuesta : false,
            cantidadTotal : 0,
            datos : {}
        });
    }
})

//
// Endpoints que reutilizan el módulo de clase Alumno.
//
app.get('/alumnos', async (req, res) => {
    res.json(alumnosArray);
})

app.get('/alumnos/:dni', async (req, res) => {
    
})

app.post('/alumnos', (req, res) => {
    console.log(typeof req.body.edad === "number")
    if (typeof req.body.nombre === "string" && req.body.nombre.length > 0 &&
        typeof req.body.dni === "string" && req.body.dni.length > 0 &&
        typeof req.body.edad === "number") {
        alumnosArray.push(new Alumno(req.body.nombre, req.body.dni, req.body.edad));
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
})

app.delete('/alumnos', (req, res) => {
    
})



//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})