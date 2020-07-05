import React, { useContext } from 'react';
import { AppContext } from '../../../lib/appContext.jsx';
import { searchForCharacter } from '../../../lib/helpers.js';
import './stageEncounter.scss';

const StagingArea = () => {
  const { appState, dispatch } = useContext(AppContext);

  const removeFromEncounter = (item) => {
    const { found, newList }  = searchForCharacter(item, appState.combatants, 'DELETE');
    if (found) dispatch({ action: 'UPDATE_COMBATANTS', value: newList });
    if (item.unique) {
      delete item.initiative;
      item.inEncounter = false;
      const { found, newList } = searchForCharacter(item, appState.characters, 'UPDATE');
      if (found) dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
    }
  }

  const cancelEncounter = () => {
    if (confirm('Are you sure you want to end this encounter?')) {
      dispatch({ action: 'UPDATE_COMBATANTS', value: [] });
      let newList = [];
      appState.characters.forEach(item => {
        newList = newList.concat({
          ...item,
          inEncounter: false,
        });
      });
      dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
      dispatch({ action: 'SWITCH_VIEW', value: 'HOME' });
    }
  };

  return (
    <div className="stagingArea">
      <fieldset>
        <legend>Start New Encounter</legend>
        <div className="stagingArea__list">
          {appState.combatants.map((item, index) => {
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