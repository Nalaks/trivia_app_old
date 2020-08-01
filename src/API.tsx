import axios from 'axios';
import _ from 'lodash'
import { Question } from './interfaces/types';

export const fetchQuizQuestions = async (amount: number, difficulty: string, category: number) => {
  let endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  if (difficulty === 'any' && category === 99) {
    endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple`
  } else if (category === 99) {
    endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  } else if (difficulty === 'any') {
    endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
  }
  const res = await axios(endpoint)
  return res.data.results.map((question: Question) => ({
    ...question,
    answers: _.shuffle([...question.incorrect_answers, question.correct_answer]),
  }))
}

