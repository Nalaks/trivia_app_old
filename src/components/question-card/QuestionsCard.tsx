import React from 'react';
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Props } from '../../interfaces/types';

const useStyles = makeStyles({
	wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50vw'
  },
  gridWrapper: {
    textAlign: 'center',
    alignItems: 'space-evenly',
    marginTop: '1.5rem'
  },
  btnAnswer: {
    fontSize: '1.8rem',
    width: '100%'
  },
  question: {
    textAlign: 'center'
  }
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
		<Card>
      <CardContent className={classes.wrapper}>
        <Typography variant="h4" component="h2">
          <p>Question: {questionNum} / {totalQuestions}</p>
        </Typography>
        <Typography className={classes.question} gutterBottom variant="h4" component="h2" dangerouslySetInnerHTML={{ __html: question }} />
			<Grid container spacing={2} className={classes.gridWrapper}>
				{ !userAnswer ? answers.map((answer) => (
					<Grid item xs={12} md={6} key={answer}>
						<Button className={classes.btnAnswer} variant='outlined' value={answer} disabled={!!userAnswer} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</Button>
					</Grid>
				)) : null}
        { userAnswer ? (
        
        // <p>Your answer: {userAnswer.answer} The correct answer: {userAnswer.correct_answer}</p>
        <Button className={classes.btnAnswer} variant='outlined'>
          {userAnswer.answer}
        </Button> 
        )
        : null }
			</Grid>
      </CardContent>
		</Card>
	);
};
