import { Schema, model } from 'mongoose';
import { TQuiz, TQuizOption } from './quiz.interface';

const QuestionSchema = new Schema<TQuizOption>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const QuizSchema: Schema = new Schema<TQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
});
// 3. Create a Model.
export const QuizModel = model<TQuiz>('Quiz', QuizSchema);
