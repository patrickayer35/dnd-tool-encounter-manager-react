import React, { Fragment, useContext } from 'react';
import { ViewContext, IN_ENCOUNTER, START, EDIT, SAVE } from '../../../lib/Context/View.jsx';
import { CharactersContext, RESET_LIST, CHARACTERS } from '../../../lib/Context/Characters.jsx';

const Home = () => {
  const { setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);

  const startNewEncounter = () => {
    if (charactersState.characters.length < 1) {
      alert('You must add at least 2 characters before you can start an encounter.');
      return;
    }
    setView(IN_ENCOUNTER);
  }

  const backToStart = () => {
    if (charactersState.characters.length > 0) {
      if(!confirm('You will lose your current character list. Is this ok?')) {
        return;
      }
    }
    dispatch({ action: RESET_LIST, listType: CHARACTERS });
    setView(START);
  }

  return (
    <Fragment>
      <button onClick={() => setView(EDIT)}>Edit Session</button>
      <button onClick={() => setView(SAVE)}>Save Session</button>
      <button onClick={() => startNewEncounter()}>Start New Encounter</button>
      <button onClick={() => backToStart()}>Back to Start</button>
    </Fragment>
  )
};

export default Home;