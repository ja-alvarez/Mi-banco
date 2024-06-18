import Cuenta from '../models/Cuenta.model.js'

const nuevaCuenta = async (req, res) => {
    try {
        let { saldo } = req.body;
        if (!saldo){
            return res.status(400).json({
                message: 'Debe proporcionar todos los valores requeridos [saldo].'
            })
        }
        let cuenta = await Cuenta.create({ saldo })
        res.status(201).json({
            message: `Nueva cuenta creada con éxito, con saldo inicial: ${saldo}`,
            cuenta
        })
        } catch (error) {
            console.log('Error code: ' + error.original.code)
            res.status(500).json({
                message: 'Error al crear la nueva cuenta.'
            });
    }
}

const consultarSaldo = async (req, res) => {
    try {
        let id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                message: 'Debe proporcionar un id válido.'
            })
        }
        let cuenta = await Cuenta.findByPk(id);
        console.log(cuenta)
        if (cuenta === null) { // if (!cuenta) {}
            console.log('No encontrada!');
            return res.status(404).json({
                message: `Cuenta con id ${id} no encontrada.`
            })
        } else {
            res.json({
                message: 'Cuenta encontrada con éxito.',
                cuenta
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al consultar la cuenta.'
        });
    }
};

let operaciones = {
    nuevaCuenta,
    consultarSaldo
};

export default operaciones; 