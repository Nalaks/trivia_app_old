import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Home.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    inputControl: {
      marginBottom: 20,
    },
    inputNumber: {
      width: '25ch',
    }
  }),
);


export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        <h1>Trivia Game</h1>
        <p>Here you can chooses which genre you wanna play and how many questions you would like.</p>
        <form className={classes.inputControl} noValidate>
          <TextField id="question-select" className={classes.inputNumber} label="Questions" type="number" inputProps={{ min: "1", max: "50", step: "1" }} defaultValue="10" required />
        </form>
        <FormControl variant="filled" className={classes.formControl} id="form-control">
          <InputLabel id="question-category">Category</InputLabel>
          <Select
            labelId="question-category"
            id="demo-simple-select-filled"
            // value={age}
            // onChange={handleChange}
            required
          >
            <MenuItem value={'any'}>Any</MenuItem>
            <MenuItem value={9}>General Knowledge</MenuItem>
            <MenuItem value={10}>Book Knowledge</MenuItem>
            <MenuItem value={11}>Film Knowledge</MenuItem>
            <MenuItem value={12}>Music Knowledge</MenuItem>
            <MenuItem value={14}>TV Knowledge</MenuItem>
            <MenuItem value={15}>Video Game Knowledge</MenuItem>
            <MenuItem value={21}>Sports Knowledge</MenuItem>
            <MenuItem value={29}>Comic Knowledge</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl} id="form-control">
          <InputLabel id="question-difficulty">Difficulty</InputLabel>
          <Select
            labelId="question-difficulty"
            id="difficulty"
            // value={age}
            // onChange={handleChange}
            required
          >
            <MenuItem value={'any'}>Any</MenuItem>
            <MenuItem value={'easy'}>Easy</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'hard'}>Hard</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">Go to Quiz</Button>
      </div>
    </React.Fragment>
  );
}