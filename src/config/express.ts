import express, { Application } from 'express';
import path from "path";
import cors from 'cors';
import morgan from 'morgan';
import ErrorHandler from '../errorHandling/errorHttp.handle';
import routes from '@routes/index';



export  class Express {
    public app: Application;

    constructor() {
        this.app=express();
        //Metodos iniciales
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(express.static(path.join(__dirname, '../','public')));
    }

    private routes() {
        this.app.use('/api', routes);
        this.app.use(ErrorHandler.handleHttp);
    }
}
// Crear una instancia de la clase y exportarla
 const app = new Express().app;
export default app;
