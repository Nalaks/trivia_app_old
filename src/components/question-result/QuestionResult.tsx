import React, { Fragment } from 'react';
import { Card, Button, CardContent, Typography, Divider } from '@material-ui/core';
import { ResultProps } from '../../interfaces/types';
import styled from 'styled-components';

const QuestionResultWrapper = styled(Card)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	width: 50%;
`;

const Question = styled(Typography)`
	margin-bottom: 30px !important;
`;

const RestartButton = styled(Button)`
	width: 50% !important;
	margin-bottom: 20px !important;
	background-color: orange !important;
`;

const RightButton = styled(Button)`
	width: 75% !important;
	margin-bottom: 20px !important;
	background-color: lightgreen !important;
`;

const WrongButton = styled(Button)`
	width: 75% !important;
	margin-bottom: 30px !important;
	background-color: red !important;
`;

const QuestionDivider = styled(Divider)`
	margin-bottom: 20px !important;
`;

const QuestionResult: React.FC<ResultProps> = ({ restart, userAnswer }) => {
	let sum = 0;

	const sumQuestions = () => {
		userAnswer.map((answer) => (answer.correct ? (sum += 1) : null));
	};

	sumQuestions();

	return (
		<QuestionResultWrapper>
			<CardContent>
				{userAnswer.map((answer, index) => (
					<Fragment key={answer.question}>
						<Question gutterBottom variant='h5'>
							{index + 1}. <span dangerouslySetInnerHTML={{ __html: answer.question }} />
						</Question>
						<Typography>Correct answer:</Typography>
						<RightButton variant='contained'>
							<span dangerouslySetInnerHTML={{ __html: answer.correct_answer }} />
						</RightButton>
						<Typography>Your answer:</Typography>
						{answer.answer === answer.correct_answer ? (
							<RightButton variant='outlined'>
								<span dangerouslySetInnerHTML={{ __html: answer.correct_answer }} />
							</RightButton>
						) : (
							<WrongButton variant='outlined'>
								<span dangerouslySetInnerHTML={{ __html: answer.answer }} />
							</WrongButton>
						)}
					</Fragment>
				))}
				<QuestionDivider variant='middle' />
				<Typography gutterBottom variant='h5'>
					You got {sum} {sum === 1 ? 'question' : 'questions'} out of {userAnswer.length} right.
				</Typography>
			</CardContent>

			<RestartButton onClick={restart} variant='contained'>
				Restart
			</RestartButton>
		</QuestionResultWrapper>
	);
};

export default QuestionResult;
