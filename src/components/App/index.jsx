import React, { useContext, Fragment } from 'react';
import './app.scss';
import MainMenu from './MainMenu/index.jsx';
import PCForm from './Forms/PCForm/index.jsx';
import NPCForm from './Forms/NPCForm/index.jsx';
import CharacterList from './CharacterList/index.jsx';
import StagingArea from './StageEncounter/index.jsx';
import SaveModal from './SaveModal/index.jsx';
import {
  ViewContext,
  ADD_PC,
  ADD_NPC,
  EDIT_PC,
  EDIT_NPC,
  STAGE_ENCOUNTER,
  SAVE
} from  '../../lib/context/ViewContext/index.jsx';
import { CharactersContext } from '../../lib/context/CharactersContext/index.jsx';

const App = () => {
  const { view, setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);

  return (
    <Fragment>
      {view === SAVE && <SaveModal />}
      <h1 className="title">Dungeons &amp; Dragons: Encounter Manager</h1>
      <div className="main">
        <div className="appSide">
          <MainMenu />
          {(view === ADD_PC || view === EDIT_PC) && (
            <PCForm
              create={view === ADD_PC ? true : false}
              character={charactersState.selectedCharacter}
            />
          )}
          {(view === ADD_NPC || view === EDIT_NPC) && (
            <NPCForm
              create={view === ADD_NPC ? true : false}
              character={charactersState.selectedCharacter}
            />
          )}
          {view === STAGE_ENCOUNTER && <StagingArea />}
        </div>
        <div className="characterListSide">
          {charactersState.characters.length > 0 && <CharacterList />}
        </div>
      </div>
    </Fragment>
  );
};

export default App;