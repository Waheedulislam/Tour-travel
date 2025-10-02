export type TQuizOption = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type TQuiz = {
  title: string;
  description: string;
  questions: TQuizOption[];
};
