import React from 'react';
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { Props } from '../../interfaces/types';
import styled from 'styled-components';

// const useStyles = makeStyles({
// 	wrapper: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		flexDirection: 'column',
// 		width: '50vw',
// 	},
// 	gridWrapper: {
// 		textAlign: 'center',
// 		alignItems: 'space-evenly',
// 		marginTop: '1.5rem',
// 	},
// 	btnAnswer: {
// 		fontSize: '1.8rem',
// 		width: '100%',
// 	},
// 	question: {
// 		textAlign: 'center',
// 	},
// });

const QuestionsCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNum, totalQuestions }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant='h4' component='h2'>
					<p>
						Question: {questionNum} / {totalQuestions}
					</p>
				</Typography>
				<Typography gutterBottom variant='h4' component='h2' dangerouslySetInnerHTML={{ __html: question }} />
				<Grid container spacing={2}>
					{!userAnswer
						? answers.map((answer) => (
								<Grid item xs={12} md={6} key={answer}>
									<Button variant='outlined' value={answer} disabled={!!userAnswer} onClick={callback}>
										<span dangerouslySetInnerHTML={{ __html: answer }} />
									</Button>
								</Grid>
						  ))
						: null}
					{userAnswer ? (
						// <p>Your answer: {userAnswer.answer} The correct answer: {userAnswer.correct_answer}</p>
						<Button variant='outlined'>{userAnswer.answer}</Button>
					) : null}
				</Grid>
			</CardContent>
		</Card>
	);
};

export default QuestionsCard;
