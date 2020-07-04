import React from 'react';
import './forms.scss';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip/index.jsx';

const CharacterForm = ({ labels, header, state, setState, save, goBack, npc }) => {
  return (
    <form className="characterForm">
      <fieldset>
        <legend>{header}</legend>
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
        {npc && (
          <div
            className="hitDice"
            onChange={event => setState({
              ...state,
              hitDice: event.target.value,
            })}
          >
            <input type="radio" name="hitDice" value={4} />d4
            <input type="radio" name="hitDice" value={6} />d6
            <input type="radio" name="hitDice" value={8} />d8
            <input type="radio" name="hitDice" value={10} />d10
            <input type="radio" name="hitDice" value={12} />d12
            <input type="radio" name="hitDice" value={20} />d20
            <Tooltip text={'You must make a selection if the Hit Dice field is not empty.'} />
          </div>
        )}
      </fieldset>
      <div className="btnsWrapper">
        <button type="button" onClick={() => save()}>Save</button>
        <button type="button" onClick={() => goBack()}>Go Back</button>
      </div>
    </form>
  );
};

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