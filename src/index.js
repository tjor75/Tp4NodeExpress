import express  from 'express'; // hacer npm i express
import cors     from 'cors';    // hacer npm i cors
import Alumno from './models/alumno.js';
import {sumar, restar, multiplicar, dividir} from './modules/matematica.js';
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from './modules/omdb-wrapper.js';

const app  = express();
const port = 3000;              // El puerto 3000 (http://localhost:3000)

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//
// Endpoints comunes
//
app.get('/', (req, res) => {                // EndPoint '/'
    res.send('Ya estoy respondiendo!');
})

app.get('/saludar', (req, res) => {             // EndPoint "/saludar"

    res.send('Hello World!');

})

app.get('/saludar/:nombre', (req, res) => {
    if (req.params.nombre !== undefined)
        res.send(`Hola ${req.params.nombre}`);
    else
        res.sendStatus(400);
})

//
// Endpoints que reutilizan el módulo matemática.js
//
app.get('/matematica/sumar', (req, res) => {
    if (req.query.n1 !== undefined || req.query.n2 !== undefined)
        res.send(sumar(Number(req.query.n1), Number(req.query.n2)));
    else
        res.sendStatus(400);
})

app.get('/matematica/restar', (req, res) => {
    if (req.query.n1 !== undefined || req.query.n2 !== undefined)
        res.send(restar(Number(req.query.n1), Number(req.query.n2)));
    else
        res.sendStatus(400);
})

app.get('/matematica/multiplicar', (req, res) => {
    if (req.query.n1 !== undefined || req.query.n2 !== undefined)
        res.send(multiplicar(Number(req.query.n1), Number(req.query.n2)));
    else
        res.sendStatus(400);
})

app.get('/matematica/dividir', (req, res) => {
    if (req.query.n1 !== undefined || req.query.n2 !== undefined)
        res.send(dividir(Number(req.query.n1), Number(req.query.n2)));
    else
        res.sendStatus(400);
})

//
// Endpoints que reutilizan el módulo omdb-wrapper.js
//
app.get('/omdb/searchbypage', (req, res) => {
    
})

app.get('/omdb/searchcomplete', (req, res) => {
    
})

app.get('/omdb/getbyomdbid', (req, res) => {
    
})

//
// Endpoints que reutilizan el módulo de clase Alumno.
//
app.get('/alumnos', (req, res) => {
    
})

app.get('/alumnos/:dni', (req, res) => {
    
})

app.post('/alumnos', (req, res) => {
    
})

app.delete('/alumnos', (req, res) => {
    
})



//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})