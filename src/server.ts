
import 'module-alias/register';
import express from 'express';
import cors from "cors";
import morgan from "morgan";
//import ErrorHandler from "./middlewares/error.handleHttp";
import "dotenv/config";
import { printHello } from '@lib/hello';
//import db from "./config/mongo";
//import routes from "./routes";
class Server {
  public app: express.Application;
  public PORT!: any;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    //Conectarse a la DB
   /*  db().then(() => {
      console.log('Connected to the database');
    })
      .catch((error) => {
        console.error(error);
        throw new Error('Failed to connect to the database');
      }) */

    // Settings
    this.PORT = process.env.PORT || 3000
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  routes() {
   /* this.app.use('/',routes);
   this.app.use(ErrorHandler.handleHttp); */
   printHello()
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server listo por el puerto ${this.PORT}`)
    })
  }
}

const server = new Server();
server.start();

//npm run dev