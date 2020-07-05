import React, { useReducer } from 'react';
import { AppContext } from '../../AppContext/index.jsx';
import './app.scss';
import MainMenu from './MainMenu/index.jsx';
import PCForm from './Forms/PCForm/index.jsx';
import NPCForm from './Forms/NPCForm/index.jsx';
import CharacterList from './CharacterList/index.jsx';
import StagingArea from './StageEncounter/index.jsx';

const updateAppState = (state, options) => {
  const { action, value } = options;
  switch(action) {
    case 'SWITCH_VIEW':
      return {
        ...state,
        view: value,
      };
    case 'UPDATE_CHARACTERS':
      return {
        ...state,
        characters: value,
      };
    case 'UPDATE_SELECTED_CHARACTER':
      return {
        ...state,
        selectedCharacter: value,
      };
    case 'UPDATE_COMBATANTS':
      return {
        ...state,
        combatants: value,
      };
    default:
      return state;
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(updateAppState, {
    view: 'START',
    characters: [],
    combatants: [],
    selectedCharacter: null,
  });
  const { view } = appState;

  return (
    <AppContext.Provider value={{appState, dispatch}}>
      <h1 className="title">Dungeons &amp; Dragons: Encounter Manager</h1>
      <div className="main">
        <div className="appSide">
          <MainMenu />
          {(view === 'ADD_PC' || view === 'EDIT_PC') && (
            <PCForm
              create={view === 'ADD_PC' ? true : false}
              character={appState.selectedCharacter}
            />
          )}
          {(view === 'ADD_NPC' || view === 'EDIT_NPC') && (
            <NPCForm
              create={view === 'ADD_NPC' ? true : false}
              character={appState.selectedCharacter}
            />
          )}
          {view === 'STAGE_ENCOUNTER' && <StagingArea />}
        </div>
        <div className="characterListSide">
          {appState.characters.length > 0 && <CharacterList />}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;