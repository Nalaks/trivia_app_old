import React from 'react';
import styled from 'styled-components';
import { ScoreProps } from '../../interfaces/types';
import { Card, CardContent, Typography } from '@material-ui/core';

const Score: React.FC<ScoreProps> = ({ score }) => {
	return (
		<Card>
			<CardContent>
				<Typography variant='h4'>Score: {score}</Typography>
			</CardContent>
		</Card>
	);
};

export default Score;
