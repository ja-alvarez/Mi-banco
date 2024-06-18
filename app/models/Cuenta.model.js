import { DataTypes } from "sequelize";
import sequelize from '../config/db.config.js';

const Cuenta = sequelize.define(
    'Cuenta',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        saldo: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    },
    {
        tableName: "Cuentas",
        timestamps: false
    }
);

export default Cuenta;