export type AnswerObject = {
	question: string
	answer: string
	correct: boolean
	correct_answer: string
}

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

// export enum Difficulty {
//   ANY = '',
//   EASY = 'easy',
//   MEDIUM = 'medium',
//   HARD = 'hard'
// }

export type Callback = (e: React.MouseEvent<HTMLButtonElement>) => void;

export interface Props {
	question: string;
	answers: string[];
	callback: Callback;
	userAnswer: AnswerObject | undefined;
	questionNum: number;
	totalQuestions: number;
}

export interface FormProps {
  start: StartFunction
}

export type StartFunction = (questions: string, difficulty: string, category: string) => Promise<void>;

export interface ResultProps {
  restart: RestartFunction
  userAnswer: AnswerObject[]
}

export type RestartFunction = () => void;