import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { css } from '@emotion/react';

const style = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <App css={style} />
);
