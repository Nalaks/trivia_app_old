import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';
import BgImage from './img/bg.jpg';

const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${BgImage});
    background-size: cover/cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyles />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
