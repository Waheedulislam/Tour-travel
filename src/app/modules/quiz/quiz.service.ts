import { TQuiz } from './quiz.interface';
import { QuizModel } from './quiz.model';

const createQuiz = async (payload: TQuiz) => {
  const result = await QuizModel.create(payload);
  return result;
};
const getQuiz = async () => {
  const result = await QuizModel.find();
  return result;
};

const getSingleQuiz = async (id: string) => {
  const result = QuizModel.findById(id);
  return result;
};
const updateQuiz = async (id: string, payload: Partial<TQuiz>) => {
  const result = QuizModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteQuiz = async (id: string, payload: Partial<TQuiz>) => {
  const result = QuizModel.findByIdAndDelete(id);
  return result;
};

export const QuizServices = {
  createQuiz,
  getQuiz,
  getSingleQuiz,
  updateQuiz,
  deleteQuiz,
};
