
import db from './config/db';
import './config/env';
import httpServer from './config/http';

export default class AppServer {

    private readonly PORT;
    private readonly DB_URI;

    constructor(port:any = 3000, dbUri?: string) {
        this.PORT = process.env.PORT || port;
        this.DB_URI = process.env.MONGODB_URL || dbUri as string;
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await db(this.DB_URI);
            console.log('Connected to the database');
        } catch (error) {
            console.error(error);
            throw new Error('Failed to connect to the database');
        }
    }

    private startHttpServer(): void {
        httpServer.listen(this.PORT, () => {
           console.log(`Server listo por el puerto ${this.PORT}`);
        });
    }

    public async start(): Promise<void> {
        await this.connectToDatabase();
        this.startHttpServer();
    }
}


