import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const RedirectWrapper = styled(Card)`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 50%;
	margin-top: 20px;
`;

const Redirect = () => {
	return (
		<RedirectWrapper>
			<CardContent>
				<Typography gutterBottom variant='h5'>
					Redirecting to question results...
				</Typography>
			</CardContent>
		</RedirectWrapper>
	);
};

export default Redirect;
