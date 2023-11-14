

import db from "./config/db";
import './config/env';
import httpServer from './config/hhtp';

const bootstrap = async ()=>{

    const PORT = process.env.PORT || 3000;
    const DB_URI = process.env.MONGODB_URL as string;

    //Conectarse a la DB
    await db(DB_URI)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((error) => {
            console.error(error);
            throw new Error('Failed to connect to the database');
        });

    httpServer.listen(PORT, () => {
        console.log(`Server listo por el puerto ${PORT}`);
    });

}

bootstrap();


