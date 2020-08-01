import React, { useState } from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, makeStyles, Card } from '@material-ui/core'
import { FormProps } from '../../interfaces/types'

const useStyles = makeStyles({
	formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2.5rem',
  },
  heading: {
    fontSize: '4rem',
    marginBottom: '4rem'
  },
  inputForm: {
    marginBottom: '2rem'
  },
  select: {
    marginBottom: '2rem'
  }
})

export const QuestionForm: React.FC<FormProps> = ({ start }) => {
  const [inputNum, setInputNum] = useState('10')
  const [category, setCategory] = useState('99')
  const [difficulty, setDifficulty] = useState('any')

  const classes = useStyles();

  return (
    <Card className={classes.formContainer}> 
      <h1 className={classes.heading}>Trivia App</h1>
      <FormControl className={classes.inputForm}>
        <TextField
            id="outlined-number"
            label="Number of Questions"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { 
                max: 50, min: 5 
            }
            }}
            placeholder={'10'}
            variant="outlined"
            onChange={event => setInputNum(event.target.value)}
          />
        <FormHelperText>Minimum: 5 and Maximum: 50</FormHelperText>
      </FormControl>
      <FormControl className={classes.select}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category-select"
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setCategory(event.target.value as string)}
        value={category}
      >
        <MenuItem value={'99'}>Any</MenuItem>
        <MenuItem value={'9'}>General Knowledge</MenuItem>
        <MenuItem value={'21'}>Sports</MenuItem>
        <MenuItem value={'10'}>Books</MenuItem>
        <MenuItem value={'11'}>Film</MenuItem>
        <MenuItem value={'12'}>Music</MenuItem>
        <MenuItem value={'14'}>TV</MenuItem>
        <MenuItem value={'15'}>Video Games</MenuItem>
        <MenuItem value={'23'}>History</MenuItem>
        <MenuItem value={'24'}>Politics</MenuItem>
        <MenuItem value={'25'}>Art</MenuItem>
        <MenuItem value={'22'}>Geography</MenuItem>
      </Select>
      <FormHelperText>Select a Quiz category</FormHelperText>
      </FormControl>
      <FormControl className={classes.select}>
      <InputLabel id="difficulty-label">Difficulty</InputLabel>
      <Select
        labelId="difficulty-label"
        id="difficulty-select"
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setDifficulty(event.target.value as string)}
        value={difficulty}
      >
        <MenuItem value={'any'}>Any</MenuItem>
        <MenuItem value={'easy'}>Easy</MenuItem>
        <MenuItem value={'medium'}>Medium</MenuItem>
        <MenuItem value={'hard'}>Hard</MenuItem>
      </Select>
      <FormHelperText>Select a Quiz difficulty</FormHelperText>
      </FormControl>
      <Button onClick={() => start(inputNum, category, difficulty)} variant='contained' color='primary'>
        Start Game
      </Button>
    </Card>
  )
}
