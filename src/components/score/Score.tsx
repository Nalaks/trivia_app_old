import React from 'react';
import styled from 'styled-components';
import { ScoreProps } from '../../interfaces/types';
import { Card, CardContent, Typography } from '@material-ui/core';

const CardScore = styled(Card)`
	width: 50%;
	text-align: center;
	margin-bottom: 20px;
`;

const Score: React.FC<ScoreProps> = ({ score }) => {
	return (
		<CardScore>
			<CardContent>
				<Typography variant='h4'>Score: {score}</Typography>
			</CardContent>
		</CardScore>
	);
};

export default Score;
