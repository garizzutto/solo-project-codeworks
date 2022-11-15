import express from 'express';
import { json } from 'body-parser';
import route from './router';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());

app.use(route);

app.listen(3333, () => console.log('server running on port 3333'));
