import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import TransferenciaControllers from './controllers/Transferencia.controller.js';
import CuentaControllers from './controllers/Cuenta.controller.js';

const app = express();

//MIDDLEWARES GENERALES
app.use(express.json());
app.use(express.urlencoded({extends: false}));
app.use(cors());
//app.use(morgan('tiny'));

// RUTA PÁGINA PRINCIPAL
app.get('/', (req,res) => {
    res.send('Ruta Principal.');
});

// ENDPOINTS
app.get('/api/transferencias', TransferenciaControllers.ultimasTransferencias) //últimas 10 transferencias
app.get('/api/cuentas/:id', CuentaControllers.consultarSaldo) // Busqueda por id

app.post('/api/transferencias', TransferenciaControllers.nuevaTransferencia);
app.post('/api/cuentas', CuentaControllers.nuevaCuenta);

app.all('*', (req, res) => {
    res.status(404).json({
        message: 'No existe la ruta consultada.'
    })
});

export default app;