import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes';
import { errorHandler } from '@shared/middlewares/errorHandler';
import '@shared/typeorm';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';

const app = express();

// Meddleware
console.log('Loading middlewares and routes...');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(cors);

// Error Handler
console.log('Loading error handlers...');
router.use(errors());
router.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is now running on port 3333`);
});
