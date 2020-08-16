import React from 'react';
import './forms.scss';
import PropTypes from 'prop-types';
import Tooltip from '../Utils/Tooltip/index.jsx';
import CommonBackground from '../Utils/CommonBackground/index.jsx'

const CharacterForm = ({ labels, header, state, setState, save, goBack, npc }) => {
  const buttons = [
    {
      func: save,
      text: 'Save',
    },
    {
      func: goBack,
      text: 'Go Back',
    },
  ];

  return (
    <CommonBackground title={header} buttons={buttons} className={'characterForm'}>
      {labels.map((item, index) => {
          return (
            <div key={index} className="dataRow">
              <label>{item.label}</label>
              <input
                type={item.type}
                value={item.value}
                onChange={event => setState({
                  ...state,
                  [item.stateMap]: event.target.value,
                })}
              />
              {item.help !== '' && <Tooltip text={item.help} />}
            </div>
          )
        })}
        {npc && buildHitDiceInputs(state, setState)}
    </CommonBackground>
  );
};

const buildHitDiceInputs = (state, setState) => {
  const btnOptions = [
    '4', '6', '8', '10', '12', '20',
  ];
  return (
    <div className="hitDice">
      {btnOptions.map((item, index) => {
        return (
          <label key={index}>
            <input
              type="radio"
              name="hitDice"
              value={item}
              defaultChecked={state.hitDice === item}
              onChange={event => setState({
                ...state,
                hitDice: event.target.value,
              })}
            />
            {`d${item}`}
          </label>
        )
      })}
      <Tooltip text={'You must make a selection if the Hit Dice field is not empty.'} />
    </div>
  );
}

CharacterForm.propTypes = {
  labels: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  npc: PropTypes.bool,
};

export default CharacterForm;