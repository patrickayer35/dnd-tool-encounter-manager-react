import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../lib/appContext.jsx';
import PropTypes from 'prop-types';
import CharacterForm from '../index.jsx';
import { searchForCharacter } from '../../../../lib/helpers.js';

const PCForm = ({ create, character }) => {
  const { appState, dispatch } = useContext(AppContext);
  const [formData, setData] = useState(character || {
    name: '',
    dexterity: '',
  });
  const labels = [
    {
      label: 'Name: ',
      type: 'text',
      stateMap: 'name',
      value: formData.name,
      help: 'Name for your PC. This is required.',
    },
    {
      label: 'Dexterity: ',
      type: 'number',
      stateMap: 'dexterity',
      value: formData.dexterity,
      help: 'Your PC\'s DEX modifier. This is required.',
    },
  ];

  const dataIsValid = () => {
    let valid = true;
    if (!formData.name || !formData.dexterity) {
      alert('You must fill in all required fields.');
      valid = false;
    }
    return valid;
  }

  const addPC = () => {
    if (!dataIsValid()) return;
    let newCharacter = {
      id: Date.now(),
      pc: true,
      unique: true,
      inEncounter: false,
      ...formData,
    };
    dispatch({ action: 'UPDATE_CHARACTERS', value: appState.characters.concat(newCharacter) });
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
  };

  const editPC = () => {
    if (!dataIsValid) return;
    const { id, pc, unique, inEncounter } = appState.selectedCharacter;
    let newCharacter = {
      id,
      pc,
      unique,
      inEncounter,
      ...formData,
    };
    const { found, newList } = searchForCharacter(newCharacter, appState.characters, 'UPDATE');
    if (found) dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
    dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: null });
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
  }

  const save = () => {
    if (create) {
      addPC();
    }
    else {
      editPC();
    }
  }

  const goBack = () => {
    if (formData.name || formData.dexterity) {
      if (!confirm('Are you sure? You will lose any unsaved changes')) {
        return;
      }
    }
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
    if (!create) {
      dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: null })
    }
  }

  return (
    <CharacterForm
      labels={labels}
      header={`${create ? 'Create' : 'Edit'} PC`}
      state={formData}
      setState={setData}
      save={save}
      goBack={goBack}
    />
  );
};

PCForm.propTypes = {
  create: PropTypes.bool.isRequired,
  character: PropTypes.object,
};

export default PCForm;