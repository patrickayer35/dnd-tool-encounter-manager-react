import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CharactersContext = createContext(null);

const UPDATE_SELECTED_CHARACTER = 'UPDATE_SELECTED_CHARACTER';
const ADD_CHARACTER = 'ADD_CHARACTER';
const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
const DELETE_CHARACTER = 'DELETE_CHARACTER';
const INITIALIZE_LIST = 'INITIALIZE_LIST';
const RESET_LIST  = 'RESET_LIST';
const CHARACTERS = 'CHARACTERS';
const COMBATANTS = 'COMBATANTS';

const updateCharacterData = (state, options) => {
  const { action, listType, value } = options;
  let currentList;
  if (listType) {
    currentList = listType === CHARACTERS ? state.characters : state.combatants;
  };
  switch(action) {
    case UPDATE_SELECTED_CHARACTER: {
      return {
        ...state,
        selectedCharacter: value,
      };
    };
    case ADD_CHARACTER: {
      const updatedList = currentList.concat(value);
      return {
        ...state,
        [listType === CHARACTERS ? 'characters' : 'combatants']: updatedList,
      }
    }
    case UPDATE_CHARACTER: {
      const updatedList = currentList.map((item) => {
        return item.id === value.id ? value : item;
      });
      return {
        ...state,
        [listType === CHARACTERS ? 'characters' : 'combatants']: updatedList,
      };
    };
    case DELETE_CHARACTER: {
      const updatedList = currentList.filter((item) => item.id !== value.id);
      return {
        ...state,
        [listType === CHARACTERS ? 'characters' : 'combatants']: updatedList,
      };
    };
    case INITIALIZE_LIST: {
      return {
        ...state,
        [listType === CHARACTERS ? 'characters' : 'combatants']: value,
      }
    }
    case RESET_LIST: {
      return {
        ...state,
        [listType === CHARACTERS ? 'characters' : 'combatants']: [],
      };
    };
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
  children: PropTypes.node.isRequired,
}

export {
  CharactersContext,
  CharactersContextProvider,
  ADD_CHARACTER,
  UPDATE_SELECTED_CHARACTER,
  UPDATE_CHARACTER,
  DELETE_CHARACTER,
  INITIALIZE_LIST,
  RESET_LIST,
  CHARACTERS,
  COMBATANTS,
};