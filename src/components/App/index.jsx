import React, { useContext, Fragment } from 'react';
import './app.scss';
import MainMenu from '../MainMenu/index.jsx';
import PCForm from '../Forms/PCForm/index.jsx';
import NPCForm from '../Forms/NPCForm/index.jsx';
import CharacterList from '../CharacterList/index.jsx';
import { ViewContext, ADD_PC, ADD_NPC, EDIT_PC, EDIT_NPC, IN_ENCOUNTER, SAVE } from '../../lib/Context/View.jsx';
import { CharactersContext } from '../../lib/Context/Characters.jsx';
import Save from '../Save/index.jsx';
import Encounter from '../Encounter/index.jsx';

const App = () => {
  const { view, } = useContext(ViewContext);
  const { charactersState } = useContext(CharactersContext);

  return (
    <Fragment>
      {view === SAVE && <Save />}
      <h1 className="title">Dungeons &amp; Dragons: Encounter Manager</h1>
      <div className="main">
        <div className="appSide">
          <MainMenu />
          {(view === ADD_PC || view === EDIT_PC) && (
            <PCForm create={view === ADD_PC} character={charactersState.selectedCharacter} />
          )}
          {(view === ADD_NPC || view === EDIT_NPC) && (
            <NPCForm create={view === ADD_NPC} character={charactersState.selectedCharacter} />
          )}
          {view === IN_ENCOUNTER && <Encounter />}
        </div>
        <div className="characterListSide">
          {charactersState.characters.length > 0 && <CharacterList />}
        </div>
      </div>
    </Fragment>
  );
};

export default App;