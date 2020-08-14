import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Card } from '@material-ui/core';
import { FormProps } from '../../interfaces/types';
import styled from 'styled-components';

const CardFormWrapper = styled(Card)`
	display: flex;
	flex-direction: column;
	padding: 20px 30px;
`;

const Heading = styled.h1`
	font-size: 50px;
	margin-bottom: 25px;
`;

const QuestionNumberField = styled(FormControl)`
	margin-bottom: 20px !important;
`;

const SelectCategoryField = styled(FormControl)`
	margin-bottom: 20px !important;
`;

const SelectDifficultyField = styled(FormControl)`
	margin-bottom: 20px !important;
`;

const SubmitButton = styled(Button)`
	background-color: orange !important;
	margin-bottom: 25px !important;
`;

const QuestionForm: React.FC<FormProps> = ({ start }) => {
	const [inputNum, setInputNum] = useState('10');
	const [category, setCategory] = useState('99');
	const [difficulty, setDifficulty] = useState('any');

	return (
		<CardFormWrapper>
			<Heading>Trivia App</Heading>
			<QuestionNumberField>
				<TextField
					id='outlined-number'
					label='Number of Questions'
					type='number'
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						inputProps: {
							max: 50,
							min: 5,
						},
					}}
					placeholder={'10'}
					variant='outlined'
					onChange={(event) => setInputNum(event.target.value)}
				/>
				<FormHelperText>Minimum: 5 and Maximum: 50</FormHelperText>
			</QuestionNumberField>
			<SelectCategoryField>
				<InputLabel id='category-label'>Category</InputLabel>
				<Select
					labelId='category-label'
					id='category-select'
					onChange={(event: React.ChangeEvent<{ value: unknown }>) => setCategory(event.target.value as string)}
					value={category}
				>
					<MenuItem value={'99'}>Any</MenuItem>
					<MenuItem value={'9'}>General Knowledge</MenuItem>
					<MenuItem value={'21'}>Sports</MenuItem>
					<MenuItem value={'10'}>Books</MenuItem>
					<MenuItem value={'11'}>Film</MenuItem>
					<MenuItem value={'12'}>Music</MenuItem>
					<MenuItem value={'14'}>TV</MenuItem>
					<MenuItem value={'15'}>Video Games</MenuItem>
					<MenuItem value={'23'}>History</MenuItem>
					<MenuItem value={'24'}>Politics</MenuItem>
					<MenuItem value={'25'}>Art</MenuItem>
					<MenuItem value={'22'}>Geography</MenuItem>
				</Select>
				<FormHelperText>Select a Quiz category</FormHelperText>
			</SelectCategoryField>
			<SelectDifficultyField>
				<InputLabel id='difficulty-label'>Difficulty</InputLabel>
				<Select
					labelId='difficulty-label'
					id='difficulty-select'
					onChange={(event: React.ChangeEvent<{ value: unknown }>) => setDifficulty(event.target.value as string)}
					value={difficulty}
				>
					<MenuItem value={'any'}>Any</MenuItem>
					<MenuItem value={'easy'}>Easy</MenuItem>
					<MenuItem value={'medium'}>Medium</MenuItem>
					<MenuItem value={'hard'}>Hard</MenuItem>
				</Select>
				<FormHelperText>Select a Quiz difficulty</FormHelperText>
			</SelectDifficultyField>
			<SubmitButton onClick={() => start(inputNum, category, difficulty)} variant='contained'>
				Start Game
			</SubmitButton>
		</CardFormWrapper>
	);
};

export default QuestionForm;
