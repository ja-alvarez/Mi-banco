import { DataTypes } from "sequelize";
import sequelize from '../config/db.config.js';

const Transferencia = sequelize.define(
    'Transferencia',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        cuenta_origen: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cuenta_destino: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        tableName: "Transferencias",
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: false,
    }
);

export default Transferencia;