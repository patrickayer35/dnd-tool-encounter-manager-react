import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext/index.jsx';
import './characterList.scss';
import classNames from 'classnames';
import { searchForCharacter } from '../../../helpers.js';

const CharacterList = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { view } = appState;
  const buttonsClassList = classNames(
    'characterList__manageBtn', {
      ['disabledBtn']: view !== 'EDIT'
    },
  );

  const handleUniqueCharacters = (item) => {
    item = {
      ...item,
      inEncounter: true,
    };
    const { found, newList } = searchForCharacter(item, appState.characters, 'UPDATE');
    if (found) dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
  };

  const addToEncounter = (item) => {
    if (item.unique) {
      handleUniqueCharacters(item);
    }
    let initiative = item.pc ? null : Math.floor(Math.random() * 20) + 1 + parseInt(item.dexterity);
    dispatch({
      action: 'UPDATE_COMBATANTS',
      value: appState.combatants.concat({ ...item, initiative: initiative }),
   });
  }

  const handleEditCharacter = (item) => {
    dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: item });
    dispatch({ action: 'SWITCH_VIEW', value: item.pc ? 'EDIT_PC' : 'EDIT_NPC' });
  }

  const deleteCharacter = (item) => {
    if (!confirm('Are you sure you want to delete this  character?')) {
      return;
    }
    const { found, newList } = searchForCharacter(item, appState.characters, 'DELETE');
    if (found) dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
  }

  return (
    <div className="characterList">
      <fieldset>
        <legend>Characters</legend>
        <p className="characterList__tooltip">* unique character</p>
        {appState.characters.map((item, index) => {
          return (
            <div className="characterList__row" key={index}>
              <button
                onClick={() => addToEncounter(item)}
                disabled={view !== 'STAGE_ENCOUNTER' || (item.unique && item.inEncounter)}
                className={classNames('characterList__name', {
                  ['disabledBtn']: view !== 'STAGE_ENCOUNTER' || (item.unique && item.inEncounter),
                })}
              >
                {item.unique ? `*${item.name}` : item.race}
              </button>
              <button
                disabled={view !== 'EDIT'}
                className={buttonsClassList}
                onClick={() => handleEditCharacter(item)}
              >
                Edit
              </button>
              <button
                disabled={view !== 'EDIT'}
                className={buttonsClassList}
                onClick={() => deleteCharacter(item)}
              >
                Delete
              </button>
          </div>
          );
        })}
      </fieldset>
    </div>
  )
};

export default CharacterList;