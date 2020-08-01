import React, { Fragment } from 'react'
import { Card, Button, CardContent, Typography, makeStyles } from '@material-ui/core'
import { ResultProps } from '../../interfaces/types'

const useStyles = makeStyles({
	wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50vw',
    padding: '2.5rem'
  },
  btnAnswer: {
    fontSize: '1.8rem',
    width: '100%',
    marginBottom: '2rem'
  },
  question: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  btnDetails: {
    textAlign: 'center',
    // marginBottom: '1.5rem'
  }
});


export const QuestionResult: React.FC<ResultProps>  = ({ restart, userAnswer }) => {

  const classes = useStyles();
  let sum = 0
  
  const sumQuestions = () => {
    userAnswer.map((answer) => answer.correct ? sum += 1: null)
  }

  sumQuestions()

  return (
    <Card className={classes.wrapper}>
      <CardContent >
      { userAnswer.map((answer, index) => (
          <Fragment key={answer.question}>
            <Typography gutterBottom variant="h4" component="h2" className={classes.question}>
            {index + 1}. <span dangerouslySetInnerHTML={{ __html: answer.question }} />
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className={classes.btnDetails}>
              Correct answer:
            </Typography>
            <Button variant='outlined' className={classes.btnAnswer}>
              <span dangerouslySetInnerHTML={{ __html: answer.correct_answer }} />
            </Button> 
            <Typography gutterBottom variant="h5" component="h2" className={classes.btnDetails}>
              Your answer:
            </Typography>
            <Button variant='contained' className={classes.btnAnswer} color={answer.correct ? 'primary' : 'secondary'} >
            <span dangerouslySetInnerHTML={{ __html: answer.answer}} />
            </Button> 
        </Fragment>
      )
      )}
        <Typography gutterBottom variant="h4" component="h2" className={classes.question}>
          You got { sum } {sum === 1 ? 'question' : 'questions'} out of { userAnswer.length } right.
        </Typography>
      </CardContent>

      <Button onClick={restart} variant='contained' color='primary'>
        Restart
      </Button>
    </Card>
  )
}
