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
import uploadConfig from '@config/upload';
import { pagination } from 'typeorm-pagination';
import { AppDataSource } from '../../data-source';
import rateLimiter from '@shared/middlewares/rateLimiter';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });

const app = express();

app.use('/files', express.static(uploadConfig.directory));
// Meddleware
console.log('Loading middlewares and routes...');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(pagination);
app.use(router);
app.use(cors);

// Error Handler
console.log('Loading error handlers...');
router.use(errors());
router.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is now running on port 3333`);
});
