import axios from 'axios';
import _ from 'lodash'
import { Difficulty, Question } from './interfaces/types';

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const res = await axios(endpoint)
  return res.data.results.map((question: Question) => ({
    ...question,
    answers: _.shuffle([...question.incorrect_answers, question.correct_answer]),
  }))
}

