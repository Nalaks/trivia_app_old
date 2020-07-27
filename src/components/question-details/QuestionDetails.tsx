import axios from 'axios';
import React, { Component } from 'react'

interface TriviaQuestions {
  category: string
  correct_answer:  string
  incorrect_answers: string[]
  question: string
}

interface State {
  questionArr: TriviaQuestions[]
}

export default class QuestionDetails extends Component {

  state: State = {
    questionArr: []
  }

  componentDidMount() {
    axios.get(`https://opentdb.com/api.php?amount=1&category=9&type=multiple`)
      .then(res => {
        const questionArr = res.data.results;
        this.setState({ questionArr }, () => console.log(this.state.questionArr));
      })
  }

  render() {
    return (
      <div>
        <h1>{ this.state.questionArr.map((q) => q.question)}</h1>
        <button>{ this.state.questionArr.map((q) => q.correct_answer) }</button>
        <button>{ this.state.questionArr.map((q) => q.incorrect_answers[0]) }</button>
        <button>{ this.state.questionArr.map((q) => q.incorrect_answers[1]) }</button>
        <button>{ this.state.questionArr.map((q) => q.incorrect_answers[2]) }</button>
      </div>
    )
  }
}

