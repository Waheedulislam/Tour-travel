import { Router } from 'express';
import { quizController } from './quiz.controller';

const quizRouter = Router();

quizRouter.post('/create-quiz', quizController.createQuiz);
// quizRouter.get('/:id', BookingController.);
quizRouter.get('/', quizController.getQuiz);
// quizRouter.patch('/:id', BookingController.);
// quizRouter.delete('/:id', BookingController.);

export default quizRouter;
