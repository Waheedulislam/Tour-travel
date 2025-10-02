import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { QuizServices } from './quiz.service';

const createQuiz = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await QuizServices.createQuiz(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Quiz created successfully',
    data: result,
  });
});
const getQuiz = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const result = await QuizServices.getQuiz();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Quiz get successfully',
    data: result,
  });
});

export const quizController = {
  createQuiz,
  getQuiz,
};
