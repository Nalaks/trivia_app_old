import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Props } from '../../interfaces/types';

const useStyles = makeStyles({
	wrapper: {
		maxWidth: 1100,
		background: '#ebfeff',
    borderRadius: 10,
    border: '2px solid #0085a3',
    padding: 20,
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
		'> p': {
			fontSize: '1rem',
		},
	},
});

export const QuestionsCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNum,
	totalQuestions,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<p>
				Question: {questionNum} / {totalQuestions}
			</p>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<div>
				{ !userAnswer ? answers.map((answer) => (
					<div key={answer}>
						<Button variant='contained' value={answer} disabled={!!userAnswer} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</Button>
					</div>
				)) : null}
        { userAnswer ? <p>Your answer: {userAnswer.answer} The correct answer: {userAnswer.correct_answer}</p> : null}
			</div>
		</div>
	);
};
