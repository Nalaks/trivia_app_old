import React, { Fragment } from 'react';
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { Props } from '../../interfaces/types';
import styled from 'styled-components';

const QuestionCardWrapper = styled(Card)`
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

const AnswerButton = styled(Button)`
	width: 75% !important;
`;

const RightButton = styled(Button)`
	width: 75% !important;
	background-color: lightgreen !important;
`;

const WrongButton = styled(Button)`
	width: 75% !important;
	background-color: red !important;
`;

const QuestionsCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNum, totalQuestions }) => {
	return (
		<QuestionCardWrapper>
			<CardContent>
				<Typography variant='h4' component='h2'>
					<p>
						Question: {questionNum} / {totalQuestions}
					</p>
				</Typography>
				<Question gutterBottom variant='h5' dangerouslySetInnerHTML={{ __html: question }} />
				<Grid container spacing={2}>
					{!userAnswer
						? answers.map((answer) => (
								<Grid item xs={12} md={6} key={answer}>
									<AnswerButton variant='outlined' value={answer} disabled={!!userAnswer} onClick={callback}>
										<span dangerouslySetInnerHTML={{ __html: answer }} />
									</AnswerButton>
								</Grid>
						  ))
						: null}
					{userAnswer ? (
						<Fragment>
							<Grid item xs={12} md={12}>
								<Typography>Your Answer:</Typography>
								{userAnswer.answer === userAnswer.correct_answer ? (
									<RightButton variant='outlined'>{userAnswer.answer}</RightButton>
								) : (
									<WrongButton variant='outlined'>{userAnswer.answer}</WrongButton>
								)}
							</Grid>
							<Grid item xs={12} md={12}>
								<Typography>Correct Answer:</Typography>
								<RightButton variant='outlined'>{userAnswer.correct_answer}</RightButton>
							</Grid>
						</Fragment>
					) : null}
				</Grid>
			</CardContent>
		</QuestionCardWrapper>
	);
};

export default QuestionsCard;
