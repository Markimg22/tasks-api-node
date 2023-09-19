import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { router } from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(8080, () => {
    console.log('Server started!');
});
