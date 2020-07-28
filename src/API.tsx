import axios from 'axios';
import _ from 'lodash'

export enum Difficulty {
  ANY = '',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
  const res = await axios(endpoint)
  return res.data.results.map((question: Question) => ({
    ...question,
    answers: _.shuffle([...question.incorrect_answers, question.correct_answer]),
  }))
}

