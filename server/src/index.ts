import express from 'express';
import { json } from 'body-parser';
import route from './router';

const app = express();

app.use(json());

app.use(route);

app.listen(3333, () => 'server running on port 3333');
