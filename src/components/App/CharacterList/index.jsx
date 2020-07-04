import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext/index.jsx';
import './characterList.scss';
import classNames from 'classnames';

const CharacterList = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { view } = appState;
  const buttonsClassList = classNames(
    'characterList__manageBtn', {
      ['disabledBtn']: view !== 'EDIT'
    },
  );

  const handleEditCharacter = (item) => {
    dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: item });
    dispatch({ action: 'SWITCH_VIEW', value: item.pc ? 'EDIT_PC' : 'EDIT_NPC' });
  }

  const deleteCharacter = (item) => {
    if (!confirm('Are you sure you want to delete this  character?')) {
      return;
    }
    const { id } = item;
    let index = appState.characters.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      let newList = appState.characters;
      newList.splice(index, 1);
      dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
    }
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
                disabled={view !== 'STAGING_ENCOUNTER'}
                className={classNames('characterList__name', {
                  ['disabledBtn']: view !== 'STAGING_ENCOUNTER',
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