import Transferencia from '../models/Transferencia.model.js'
import Cuenta from '../models/Cuenta.model.js'
import sequelize from '../config/db.config.js';

const nuevaTransferencia = async (req, res) => {
    try {
        let { descripcion, monto, cuenta_origen, cuenta_destino } = req.body;
        monto = Number(monto);
        if (!descripcion || !monto || !cuenta_origen || !cuenta_destino) {
            return res.status(400).json({
                message: 'Debe proporcionar todos los valores requeridos [descripcion, monto, cuenta_origen, cuenta_destino].'
            })
        }
        let cuentaOrigen = await Cuenta.findByPk(cuenta_origen);
        let cuentaDestino = await Cuenta.findByPk(cuenta_destino);
        if (!cuentaOrigen || !cuentaDestino) {
            return res.status(404).json({
                message: 'Una o ambas cuentas especificadas no existen.'
            });
        }
        if (cuentaOrigen.saldo < monto) {
            return res.status(400).json({
                message: 'No dispone de saldo suficiente para realizar la transacción.'
            });
        }
        const transaction = await sequelize.transaction();
        try { // transaction
            const transferencia = await Transferencia.create({ descripcion, monto, cuenta_origen, cuenta_destino }, { transaction });
            //Revisar
            cuentaOrigen.saldo = Number(cuentaOrigen.saldo)
            cuentaDestino.saldo = Number(cuentaDestino.saldo)
            cuentaOrigen.saldo -= monto;
            cuentaDestino.saldo += monto;
            await cuentaOrigen.save({ transaction });
            await cuentaDestino.save({ transaction });
            await transaction.commit();
            console.log(`Transferencia de ${monto} realizada desde la cuenta id: ${cuentaOrigen.id} hacia la cuenta id: ${cuentaDestino.id}`)
            res.status(201).json({
                message: 'Transferencia realizada con éxito.',
                transferencia
            })
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        console.log('Error' + error)
        res.status(500).json({
            message: 'Error al hacer la transferencia.'
        });
    }
};

const ultimasTransferencias = async (req, res) => {
    try {
        let transferencias = await Transferencia.findAll({
            attributes: ['id', 'descripcion', 'monto', 'cuenta_origen', 'cuenta_destino', 'createTimestamp'],
            order: [['id', 'desc']],
            limit: 10
        });
        res.json({
            message: 'Todo ok.',
            transferencias
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error al intentar traer las últimas transferencias.'
        });
    }
};

const operaciones = {
    nuevaTransferencia,
    ultimasTransferencias,
};

export default operaciones; 