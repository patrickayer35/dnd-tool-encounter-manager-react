import React, { useContext } from 'react';
import { ViewContext, HOME } from '../../../lib/context/ViewContext/index.jsx';
import { CharactersContext, UPDATE_COMBATANTS, UPDATE_CHARACTERS } from '../../../lib/context/CharactersContext/index.jsx';
import { UPDATE, DELETE } from '../../../lib/CharacterClass.js';
import './stageEncounter.scss';

const StagingArea = () => {
  const { setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);


  const removeFromEncounter = (item) => {
    const { found, newList }  = item.searchForCharacter(charactersState.combatants, DELETE);
    if (found) dispatch({ action: UPDATE_COMBATANTS, value: newList });
    if (item.unique) {
      item.resetInitiative();
      const { found, newList } = item.searchForCharacter(charactersState.combatants, UPDATE);
      if (found) dispatch({ action: UPDATE_CHARACTERS, value: newList });
    }
  }

  const cancelEncounter = () => {
    if (confirm('Are you sure you want to end this encounter?')) {
      dispatch({ action: UPDATE_COMBATANTS, value: [] });
      let newList = [];
      charactersState.characters.forEach(item => {
        item.resetInitiative();
        newList = newList.concat(item);
      });
      dispatch({ action: UPDATE_CHARACTERS, value: newList });
      setView(HOME);
    }
  };

  return (
    <div className="stagingArea">
      <fieldset>
        <legend>Start New Encounter</legend>
        <div className="stagingArea__list">
          {charactersState.combatants.map((item, index) => {
            return (
              <div key={index} className="stagingArea__row">
                <span>{item.name || item.race}</span>
                <input
                  disabled={!item.pc}
                  placeholder={item.initiative || 'PC\'s initiative'}
                />
                <button onClick={() => removeFromEncounter(item)}>Remove from Encounter</button>
              </div>
            );
          })}
        </div>
      </fieldset>
      <div className="btnsWrapper">
        <button>Start!</button>
        <button onClick={() => cancelEncounter()}>Cancel</button>
      </div>
    </div>
  );
}

export default StagingArea;