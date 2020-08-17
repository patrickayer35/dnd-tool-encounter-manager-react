import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const START = 'START';
const HOME = 'HOME';
const EDIT = 'EDIT';
const ADD_PC = 'ADD_PC';
const ADD_NPC = 'ADD_NPC';
const EDIT_PC = 'EDIT_PC';
const EDIT_NPC = 'EDIC_NPC';
const IN_ENCOUNTER = 'IN_ENCOUNTER';
const SAVE = 'SAVE';

const ViewContext = createContext(null);

const ViewContextProvider = ({ children }) => {
  const [view, setView] = useState(START);

  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>;
};

ViewContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
  IN_ENCOUNTER,
  SAVE,
};