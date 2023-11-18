import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import ErrorHandler from '../middlewares/errorHttp.handle';
import routes from '../routes';

const expressApp: express.Application = express();

    // Middlewares
    expressApp.use(cors());
    expressApp.use(express.json());
    expressApp.use(morgan('dev'));

    //Routes
    expressApp.use('/', routes);
    expressApp.use(ErrorHandler.handleHttp);

export default expressApp;