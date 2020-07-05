import React, { Fragment, useContext } from 'react';
import { AppContext } from '../../../AppContext/index.jsx';

const MainMenu = () => {
  const appContext = useContext(AppContext);
  const { appState } = appContext;
  const { view } = appState;

  return (
    <Fragment>
      {view === 'START' && startButtons(appContext)}
      {view === 'HOME' && homeButtons(appContext)}
      {view === 'EDIT' && editButtons(appContext)}
    </Fragment>
  );
};

export default MainMenu;

const startButtons = (appContext) => {
  const { dispatch } = appContext;
  return (
    <Fragment>
      <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'HOME' })}>Start New Session</button>
      <button>Load Session</button>
    </Fragment>
  );
};

const homeButtons = (appContext) => {
  const { appState, dispatch } = appContext;

  const startNewEncounter = () => {
    if (appState.characters.length < 1) {
      alert('You must add at least 2 characters before you can start an encounter.');
      return;
    }
    dispatch({ action: 'SWITCH_VIEW', value: 'STAGE_ENCOUNTER' });
  }

  const backToStart = () => {
    if (appState.characters.length > 0) {
      if(!confirm('You will lose your current character list. Is this ok?')) {
        return;
      }
    }
    dispatch({ action: 'UPDATE_CHARACTERS', value: [] });
    dispatch({ action: 'SWITCH_VIEW', value: 'START' });
  }

  return (
    <Fragment>
      <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' })}>Edit Session</button>
      <button>Save Session</button>
      <button onClick={() => startNewEncounter()}>Start New Encounter</button>
      <button onClick={() => backToStart()}>Back to Start</button>
    </Fragment>
  );
};

const editButtons = (appContext) => {
  const { dispatch } = appContext;
  return (
    <Fragment>
      <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'ADD_PC' })}>Add PC</button>
      <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'ADD_NPC' })}>Add NPC</button>
      <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'HOME' })}>Done Editing</button>
    </Fragment>
  );
}