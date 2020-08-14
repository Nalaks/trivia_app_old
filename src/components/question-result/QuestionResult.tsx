import React, { Fragment } from 'react';
import { Card, Button, CardContent, Typography } from '@material-ui/core';
import { ResultProps } from '../../interfaces/types';
import styled from 'styled-components';

// const useStyles = makeStyles({
// 	wrapper: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		flexDirection: 'column',
// 		width: '50vw',
// 		padding: '2.5rem',
// 	},
// 	btnAnswer: {
// 		fontSize: '1.8rem',
// 		width: '100%',
// 		marginBottom: '2rem',
// 	},
// 	question: {
// 		textAlign: 'center',
// 		marginBottom: '2rem',
// 	},
// 	btnDetails: {
// 		textAlign: 'center',
// 		// marginBottom: '1.5rem'
// 	},
// 	result: {
// 		textAlign: 'center',
// 		marginTop: '2rem',
// 	},
// });

const QuestionResult: React.FC<ResultProps> = ({ restart, userAnswer }) => {
	let sum = 0;

	const sumQuestions = () => {
		userAnswer.map((answer) => (answer.correct ? (sum += 1) : null));
	};

	sumQuestions();

	return (
		<Card>
			<CardContent>
				{userAnswer.map((answer, index) => (
					<Fragment key={answer.question}>
						<Typography gutterBottom variant='h4' component='h2'>
							{index + 1}. <span dangerouslySetInnerHTML={{ __html: answer.question }} />
						</Typography>
						<Typography gutterBottom variant='h5' component='h2'>
							Correct answer:
						</Typography>
						<Button variant='outlined'>
							<span dangerouslySetInnerHTML={{ __html: answer.correct_answer }} />
						</Button>
						<Typography gutterBottom variant='h5' component='h2'>
							Your answer:
						</Typography>
						<Button variant='contained' color={answer.correct ? 'primary' : 'secondary'}>
							<span dangerouslySetInnerHTML={{ __html: answer.answer }} />
						</Button>
					</Fragment>
				))}
				<Typography gutterBottom variant='h4' component='h2'>
					You got {sum} {sum === 1 ? 'question' : 'questions'} out of {userAnswer.length} right.
				</Typography>
			</CardContent>

			<Button onClick={restart} variant='contained' color='primary'>
				Restart
			</Button>
		</Card>
	);
};

export default QuestionResult;
