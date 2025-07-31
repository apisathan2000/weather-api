import { createClient } from 'redis';
import 'dotenv/config'

const client = createClient({
    username: process.env.REDIS_DB_USERNAME,
    password: process.env.REDIS_DB_PASSWORD,
    socket: {
        host: process.env.REDIS_CONNECTION_STRING,
        port: process.env.REDIS_CONNECTION_PORT,
    }
});

client.on('error', err => console.log('Redis Client Error', err));

export default client;


