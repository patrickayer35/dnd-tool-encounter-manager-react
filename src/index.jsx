import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App/index.jsx';
import { ViewContextProvider } from './lib/context/ViewContext/index.jsx';
import { CharactersContextProvider } from './lib/context/CharactersContext/index.jsx';

ReactDom.render(
  <ViewContextProvider>
    <CharactersContextProvider>
      <App />
    </CharactersContextProvider>
  </ViewContextProvider>,
  document.getElementById('root'));