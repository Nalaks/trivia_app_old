import React, { Fragment, useState } from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { QuestionsCard } from './components/question-card/QuestionsCard';
import { fetchQuizQuestions } from './API'
import { makeStyles } from '@material-ui/core/styles';
import { QuestionState, AnswerObject } from './interfaces/types';
import { QuestionForm } from './components/question-form/QuestionForm';
import { QuestionResult } from './components/question-result/QuestionResult';


const useStyles = makeStyles({
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '2.5rem'
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

	const startTrivia = async (questionsNum: string, category: string, difficulty: string) => {
		let questions = +questionsNum
		if (questions <= 4) {
			questions = 5
		} else if (questions > 50) {
			questions = 50
		}
		setLoading(true)
		setGameOver(false)
		setTotalQuestions(questions)

		const newQuestions = await fetchQuizQuestions(questions, difficulty, +category)
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
		setTimeout(() => {
			if (userAnswers.length + 1 === totalQuestions && userAnswers.length > 1) {
				setGameOver(true)
			}
		}, 2000);

	};

  const nextQuestion = () => {
		const nextQuestion = number + 1

		if (nextQuestion === totalQuestions) {
			setGameOver(true)
		} else {
			setNumber(nextQuestion)
		}
	};

	const restart = () => {
		setTotalQuestions(0)
		setQuestions([])
		setScore(0)
		setUserAnswers([])
		setNumber(0)
	}
  
	const classes = useStyles();

	return (
		<Fragment>
			<div className={classes.wrapper}>
				{ gameOver && userAnswers.length < 1 ? <QuestionForm start={startTrivia}/> : null }
				{ !gameOver ? <p>Score: { score }</p> : null }
				{ loading ? <CircularProgress size='10rem' /> : null }
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
				{ gameOver && userAnswers.length === totalQuestions && userAnswers.length > 1 ? 
				<QuestionResult restart={restart} userAnswer={userAnswers}/>
				: null }
			</div>
		</Fragment>
	);
}

export default App;
