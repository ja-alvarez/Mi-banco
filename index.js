import sequelize from './app/config/db.config.js';
import app from './app/app.js';

const main = async () => {
    try {
        //await sequelize.authenticate(); // Probar conexión
        await sequelize.sync({ force: false, alter: true }); //Durante desarrollo
        console.log('Conectado a la base de datos.');
        app.listen(3000, () => {
            console.log('Servidor corriendo en http://localhost/3000');
        })
    } catch (error) {
        console.log(error)
    }
}
main();