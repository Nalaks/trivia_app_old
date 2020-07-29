import React from 'react';
import { Button } from '@material-ui/core';
import { AnswerObject } from '../../App'

type Callback = (e: React.MouseEvent<HTMLButtonElement>) => void;

interface Props {
	question: string;
	answers: string[];
	callback: Callback;
	userAnswer: AnswerObject | undefined;
	questionNum: number;
	totalQuestions: number;
}

export const QuestionsCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNum,
	totalQuestions,
}) => (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(answer => (
          <div key={answer}>
            <Button variant="contained" value={answer} disabled={!!userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          </div>
        ))}
      </div>
    </div>
);
