import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CharactersContext = createContext(null);

const UPDATE_CHARACTERS = 'UPDATE_CHARACTERS';
const UPDATE_COMBATANTS = 'UPDATE_COMBATANTS';
const UPDATE_SELECTED_CHARACTER = 'UPDATE_SELECTED_CHARACTER';

const updateCharacterData = (state, options) => {
  const { action, value } = options;
  switch(action) {
    case 'UPDATE_CHARACTERS':
      return {
        ...state,
        characters: value,
      };
    case 'UPDATE_COMBATANTS':
      return {
        ...state,
        combatants: value,
      };
    case 'UPDATE_SELECTED_CHARACTER':
      return {
        ...state,
        selectedCharacter: value,
      };
    default:
      return state;
  };
};

const CharactersContextProvider = ({ children }) => {
  const [charactersState, dispatch] = useReducer(updateCharacterData, {
    characters: [],
    combatants: [],
    selectedCharacter: null,
  });

  return <CharactersContext.Provider value={{ charactersState, dispatch }}>{children}</CharactersContext.Provider>
};

CharactersContextProvider.propTypes = {
  children: PropTypes.JSX,
}

export {
  CharactersContext,
  CharactersContextProvider,
  UPDATE_CHARACTERS,
  UPDATE_COMBATANTS,
  UPDATE_SELECTED_CHARACTER,
};