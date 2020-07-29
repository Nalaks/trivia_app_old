import React, { Fragment, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { QuestionsCard } from './components/question-card/QuestionsCard';
import { fetchQuizQuestions, Difficulty, QuestionState } from './API'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'> p': {
		color: '#fff'
		},
		'> h1': {
			fontFamily: 'Fascinate Inline',
			fontSize: 70,
			fontWeight: 400,
			textAlign: 'center',
			margin: 20
		}
	},		
	score: {
		color: '#fff',
		fontSize: '2rem',
		margin: 0
	}
})


export type AnswerObject = {
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

	const startTrivia = async () => {
		setLoading(true)
		setGameOver(false)

		const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
		setQuestions(newQuestions)

		setScore(0)
		setUserAnswers([])
		setNumber(0)
		setLoading(false)
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			const userAnswer = e.currentTarget.value
			const correctAnswer = questions[number].correct_answer === userAnswer
			if (correctAnswer) {
				setScore(prev => prev + 1)
			}
			const answerObject: AnswerObject = {
				question: questions[number].question,
				answer: userAnswer,
				correct: correctAnswer,
				correct_answer: questions[number].correct_answer
			}
			setUserAnswers(prev => [...prev, answerObject])
		}
	};

  const nextQuestion = () => {
		const nextQuestion = number + 1

		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true)
		} else {
			setNumber(nextQuestion)
		}
	};
  
	const classes = useStyles();


	return (
		<Fragment>
			<div className={classes.wrapper}>
				{ gameOver ? <h1>Trivia App</h1> : null }
				{ gameOver || userAnswers.length ===  TOTAL_QUESTIONS ? 
				(
				<Button onClick={startTrivia} variant='contained' color='primary'>
					Start Game
				</Button>
				) : null }
				{ !gameOver ? <p className={classes.score}>Score: { score }</p> : null }
				{ loading ? <CircularProgress /> : null }
				{ !loading && !gameOver ?
					(
					<QuestionsCard 
					questionNum={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
					/>
					) 
					: null }
				{ !gameOver && userAnswers.length !==  TOTAL_QUESTIONS && !loading && userAnswers[number] ? <Button onClick={nextQuestion} variant='contained' color='primary'>
					Next
				</Button> : null }
			</div>
		</Fragment>
	);
}

export default App;
