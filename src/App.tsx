import React, { Fragment, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { QuestionsCard } from './components/question-card/QuestionsCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'

type AnswerObject = {
	question: string
	answer: string
	correct: boolean
	correct_answer: string
}

const TOTAL_QUESTIONS = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivia = async () => {};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};
  
  console.log(fetchQuizQuestions(10, Difficulty.EASY))


	return (
		<Fragment>
			<h1>Trivia App</h1>
			<Button onClick={startTrivia} variant='contained' color='primary'>
				Start Game
			</Button>
			<p>Score</p>
			<CircularProgress />
			{/* <QuestionsCard
				questionNum={number + 1}
				totalQuestions={TOTAL_QUESTIONS}
				question={question[number].question}
				answers={questions[number].answers}
				userAnswer={userAnswers ? userAnswers[number] : undefined}
				callback={checkAnswer}
			/> */}
			<Button onClick={nextQuestion} variant='contained' color='primary'>
				Next
			</Button>
		</Fragment>
	);
}

export default App;
