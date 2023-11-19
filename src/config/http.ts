
import { createServer, Server } from 'http';
import App from './express';
import { Application } from 'express';

export  class Http {
    public httpServer: Server;
    private app:Application=App;

    constructor() {
        this.httpServer = createServer(this.app);
    }
}
// Crear una instancia de la clase y exportarla
 const http = new Http().httpServer;
export default http;