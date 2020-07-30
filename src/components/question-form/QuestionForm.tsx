import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { FormProps } from '../../interfaces/types'

export const QuestionForm: React.FC<FormProps> = ({ start }) => {
  const [inputNum, setInputNum] = useState('')

  return (
    <div>
      <h1>Trivia App</h1>
      <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={event => setInputNum(event.target.value)}
        />
      <Button onClick={() => start(inputNum)} variant='contained' color='primary'>
        Start Game
      </Button>
    </div>
  )
}
