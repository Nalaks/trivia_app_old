import React from 'react';
import { Button } from '@material-ui/core';

interface Props {
	question: string;
	answers: string[];
	callback: any;
	userAnswer: any;
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
          <div>
            <Button variant="contained" disabled={userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          </div>
        ))}
      </div>
    </div>
);
