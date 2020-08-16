import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App/index.jsx';
import { ViewContextProvider } from './lib/Context/View.jsx';
import { CharactersContextProvider } from './lib/Context/Characters.jsx';

ReactDom.render(
  <ViewContextProvider>
    <CharactersContextProvider>
      <App />
    </CharactersContextProvider>
  </ViewContextProvider>,
  document.getElementById('root'),
);