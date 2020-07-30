import React, { Fragment, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { QuestionsCard } from './components/question-card/QuestionsCard';
import { fetchQuizQuestions } from './API'
import { makeStyles } from '@material-ui/core/styles';
import { QuestionState, AnswerObject, Difficulty } from './interfaces/types';
import { QuestionForm } from './components/question-form/QuestionForm';


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

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [totalQuestions, setTotalQuestions] = useState(0)

	const startTrivia = async (num: string) => {
		setLoading(true)
		setGameOver(false)
		setTotalQuestions(+num)

		const newQuestions = await fetchQuizQuestions(+num, Difficulty.EASY)
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

		if (nextQuestion === totalQuestions) {
			setGameOver(true)
		} else {
			setNumber(nextQuestion)
		}
	};
  
	const classes = useStyles();


	return (
		<Fragment>
			<div className={classes.wrapper}>
				<QuestionForm start={startTrivia}/>
				{ !gameOver ? <p className={classes.score}>Score: { score }</p> : null }
				{ loading ? <CircularProgress /> : null }
				{ !loading && !gameOver ?
					(
					<QuestionsCard 
					questionNum={number + 1}
					totalQuestions={totalQuestions}
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
					/>
					) 
					: null }
				{ !gameOver && userAnswers.length !==  totalQuestions && !loading && userAnswers[number] ? <Button onClick={nextQuestion} variant='contained' color='primary'>
					Next
				</Button> : null }
			</div>
		</Fragment>
	);
}

export default App;
