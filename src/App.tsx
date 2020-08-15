// dependencies
import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { QuestionState, AnswerObject } from './interfaces/types';
import styled from 'styled-components';

// components
import QuestionsCard from './components/question-card/QuestionsCard';
import QuestionForm from './components/question-form/QuestionForm';
import QuestionResult from './components/question-result/QuestionResult';
import Score from './components/score/Score';
import Next from './components/next/Next';
import Redirect from './components/redirect/Redirect';

// api
import { fetchQuizQuestions } from './API';

const AppWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 2.5rem;
`;

function App() {
	// state
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [totalQuestions, setTotalQuestions] = useState(0);

	// starts game
	const startTrivia = async (questionsNum: string, category: string, difficulty: string) => {
		let questions = +questionsNum;
		if (questions <= 4) {
			questions = 5;
		} else if (questions > 50) {
			questions = 50;
		}
		setLoading(true);
		setGameOver(false);
		setTotalQuestions(questions);

		const newQuestions = await fetchQuizQuestions(questions, difficulty, +category);
		setQuestions(newQuestions);

		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	// check answer validity
	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			const userAnswer = e.currentTarget.value;
			const correctAnswer = questions[number].correct_answer === userAnswer;
			if (correctAnswer) {
				setScore((prev) => prev + 1);
			}
			const answerObject: AnswerObject = {
				question: questions[number].question,
				answer: userAnswer,
				correct: correctAnswer,
				correct_answer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
		setTimeout(() => {
			if (userAnswers.length + 1 === totalQuestions && userAnswers.length > 1) {
				setGameOver(true);
			}
		}, 2000);
	};

	const nextQuestion = () => {
		const nextQuestion = number + 1;

		if (nextQuestion === totalQuestions) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	// resets the state
	const restart = () => {
		setTotalQuestions(0);
		setQuestions([]);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
	};

	return (
		<AppWrapper>
			{gameOver && userAnswers.length < 1 ? <QuestionForm start={startTrivia} /> : null}
			{!gameOver && !loading ? <Score score={score} /> : null}
			{loading ? <CircularProgress size={100} /> : null}
			{!loading && !gameOver ? (
				<QuestionsCard
					questionNum={number + 1}
					totalQuestions={totalQuestions}
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
				/>
			) : null}
			{!gameOver && userAnswers.length !== totalQuestions && !loading && userAnswers[number] ? (
				<Next nextQuestion={nextQuestion} />
			) : null}
			{!gameOver && userAnswers.length === totalQuestions && userAnswers.length > 1 ? <Redirect /> : null}
			{gameOver && userAnswers.length === totalQuestions && userAnswers.length > 1 ? (
				<QuestionResult restart={restart} userAnswer={userAnswers} />
			) : null}
		</AppWrapper>
	);
}

export default App;
