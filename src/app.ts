import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './app/modules/users/user.route';
import dotenv from 'dotenv';
import tourRouter from './app/modules/tour/tour.route';
import { StatusCodes } from 'http-status-codes';
import bookingRouter from './app/modules/booking/booking.route';
dotenv.config();

const app: Application = express();
const port = 3000;

//parsers

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/tour', tourRouter);
app.use('/api/booking', bookingRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.log('errors :', err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message, error: err });
});
export default app;
