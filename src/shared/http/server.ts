import express from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler } from '@shared/middlewares/errorHangler';

const app = express();

app.use(router);

// Meddlewares
app.use(express.json());
app.use(cors);

// Error Handler
console.log('Loading error handlers...');
router.use(errorHandler);

app.listen(3333, () => {
  console.log(`Server is now running on port 3333`);
});
