import 'dotenv/config';
import mongoose from 'mongoose';

async function dbConnect(url:string): Promise<void> {
    console.log('Conectando con mongoose ...');
    await mongoose.connect(url);
}

export default dbConnect;

//'mongodb://127.0.0.1:27017/test'
