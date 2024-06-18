CREATE DATABASE banco;

CREATE TABLE IF NOT EXISTS Transferencias (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    cuenta_origen INTEGER NOT NULL,
    cuenta_destino INTEGER NOT NULL,
    CONSTRAINT fk_cuenta_origen FOREIGN KEY (cuenta_origen) REFERENCES cuentas (id),
    CONSTRAINT fk_cuenta_destino FOREIGN KEY (cuenta_destino) REFERENCES cuentas (id)
);

CREATE TABLE IF NOT EXISTS Cuentas (
    id SERIAL PRIMARY KEY,
    saldo DECIMAL CHECK (saldo >= 0) NOT NULL
);