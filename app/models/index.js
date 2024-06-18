import Transferencia from './Transferencia.model.js';
import Cuenta from './Cuenta.model.js'

Cuenta.hasMany(Transferencia, { foreignKey: 'cuenta_origen' });
Cuenta.hasMany(Transferencia, { foreignKey: 'cuenta_destino' });

Transferencia.belongsTo(Cuenta, { as: 'CuentaOrigen', foreignKey: 'cuenta_origen' });
Transferencia.belongsTo(Cuenta, { as: 'CuentaDestino', foreignKey: 'cuenta_destino' });

export {
    Transferencia,
    Cuenta
}