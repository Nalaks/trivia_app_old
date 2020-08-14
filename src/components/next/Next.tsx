import React from 'react';
import { Card, Button } from '@material-ui/core';
import { NextProps } from '../../interfaces/types';
import styled from 'styled-components';

const NextWrapper = styled(Card)`
	width: 50%;
	margin-top: 20px;
	padding: 20px 0;
	text-align: center;
`;

const NextButton = styled(Button)`
	width: 50% !important;
	background-color: orange !important;
`;

const Next: React.FC<NextProps> = ({ nextQuestion }) => {
	return (
		<NextWrapper>
			<NextButton onClick={nextQuestion} variant='contained'>
				Next
			</NextButton>
		</NextWrapper>
	);
};

export default Next;
