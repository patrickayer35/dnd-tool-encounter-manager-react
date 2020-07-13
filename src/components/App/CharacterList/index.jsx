import React, { useContext } from 'react'
import { CharactersContext, UPDATE_CHARACTERS, UPDATE_COMBATANTS, UPDATE_SELECTED_CHARACTER } from '../../../lib/context/CharactersContext/index.jsx';
import { ViewContext, EDIT, EDIT_PC, EDIT_NPC, STAGE_ENCOUNTER } from '../../../lib/context/ViewContext/index.jsx';
import './characterList.scss';
import classNames from 'classnames';
import { Character, UPDATE, DELETE } from '../../../lib/CharacterClass.js';

const CharacterList = () => {
  const { view, setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);
  const buttonsClassList = classNames(
    'characterList__manageBtn', {
      ['disabledBtn']: view !== EDIT
    },
  );

  const handleUniqueCharacters = (item) => {
    item.inEncounter = true;
    if (!item.pc) {
      item.randomizeInitiative();
    };
    const { found, newList } = item.searchForCharacter(charactersState.characters, UPDATE);
    if (found) dispatch({ action: UPDATE_CHARACTERS, value: newList });
  };

  const addToEncounter = (item) => {
    if (item.unique) {
      handleUniqueCharacters(item);
    } else {
      item = new Character({
        ...item,
        id: Date.now(),
        inEncounter: true,
      });
      item.randomizeInitiative();
    }
    dispatch({ action: UPDATE_COMBATANTS, value: charactersState.combatants.concat(item) });
  }

  const handleEditCharacter = (item) => {
    dispatch({ action: UPDATE_SELECTED_CHARACTER, value: item });
    setView(item.pc ? EDIT_PC : EDIT_NPC);
  }

  const deleteCharacter = (item) => {
    if (!confirm('Are you sure you want to delete this character?')) {
      return;
    }
    const { found, newList } = item.searchForCharacter(charactersState.characters, DELETE);
    if (found) dispatch({ action: UPDATE_CHARACTERS, value: newList });
  }

  return (
    <div className="characterList">
      <fieldset>
        <legend>Characters</legend>
        <p className="characterList__tooltip">* unique character</p>
        {charactersState.characters.map((item, index) => {
          return (
            <div className="characterList__row" key={index}>
              <button
                onClick={() => addToEncounter(item)}
                disabled={view !== STAGE_ENCOUNTER || (item.unique && item.inEncounter)}
                className={classNames('characterList__name', {
                  ['disabledBtn']: view !== STAGE_ENCOUNTER || (item.unique && item.inEncounter),
                })}
              >
                {item.unique ? `*${item.name}` : item.race}
              </button>
              <button
                disabled={view !== EDIT}
                className={buttonsClassList}
                onClick={() => handleEditCharacter(item)}
              >
                Edit
              </button>
              <button
                disabled={view !== EDIT}
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