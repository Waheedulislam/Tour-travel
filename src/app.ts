import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/user.route';
import dotenv from 'dotenv';
import tourRouter from './app/modules/tour/tour.route';
import bookingRouter from './app/modules/booking/booking.route';
import { globalErrorHandler } from './middleWares/globalErrorHandler';
import authRouter from './app/modules/auth/auth.route';
dotenv.config();

const app: Application = express();

//parsers

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/tour', tourRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route is not found',
  });
});
export default app;
