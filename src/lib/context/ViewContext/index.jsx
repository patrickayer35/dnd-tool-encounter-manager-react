import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const START = 'START';
const HOME = 'HOME';
const EDIT = 'EDIT';
const ADD_PC = 'ADD_PC';
const ADD_NPC = 'ADD_NPC';
const EDIT_PC = 'EDIT_PC';
const EDIT_NPC = 'EDIC_NPC';
const STAGE_ENCOUNTER = 'STAGE_ENCOUNTER';
const SAVE = 'SAVE';

const ViewContext = createContext(null);

/**
 * @param {JSX} children
 */
const ViewContextProvider = ({ children }) => {
  const [view, setView] = useState(START);

  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
};

ViewContextProvider.propTypes = {
  children: PropTypes.JSX,
};

export {
  ViewContext,
  ViewContextProvider,
  START,
  HOME,
  EDIT,
  ADD_PC,
  ADD_NPC,
  EDIT_PC,
  EDIT_NPC,
  STAGE_ENCOUNTER,
  SAVE,
};