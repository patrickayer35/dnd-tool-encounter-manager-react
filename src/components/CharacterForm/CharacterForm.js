import React, { Fragment } from 'react';

import './CharacterForm.css';

class CharacterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            npcElem: ''
        }
    }

    clearForm() {

        let ids = [
            'editForm__nameInput',
            'editForm__raceInput',
            'editForm__passivePerceptionInput',
            'editForm__dexterityInput'
        ];

        let npcIds = [];

        if (this.props.npc) {

            npcIds = [
                'editForm__hitPointsInput',
                'editForm__hitDiceInput',
                'editForm__hitPointsModInput',
                'editForm__pageNumberInput'
            ];

            let radioBtns = [
                'editForm__d4',
                'editForm__d6',
                'editForm__d8',
                'editForm__d10',
                'editForm__d12',
                'editForm__d20'
            ];

            for (let i = 0; i < radioBtns.length; i++) {
                document.getElementById(radioBtns[i]).checked = false;
            }

            ids = ids.concat(npcIds);

        }

        for (let i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).value = '';
        }

    }

    cancelForm() {
        if (confirm('Are you sure? Any unsaved data will be lost.')) {
            this.clearForm();
            this.props.goBack();
        }
    }

    validateForm() {

        if (!this.props.npc && document.getElementById('editForm__nameInput').value == '') {
            return false;
        }

        let requiredFields = [
            'editForm__raceInput',
            'editForm__passivePerceptionInput',
            'editForm__dexterityInput'
        ];

        for (let i = 0; i < requiredFields; i++) {
            if (document.getElementById(requiredFields[i]).value == '') {
                return false;
            }
        }

        if (this.props.npc) {
            if (document.getElementById('editForm__pageNumberInput').value != '') {
                if (document.getElementById('editForm__hitPointsInput').value != '') {
                    return true;
                }
                else {
                    if (document.getElementById('editForm__hitDiceInput').value != '') {
                        if (document.getElementById('editForm__d4').checked || 
                            document.getElementById('editForm__d6').checked ||
                            document.getElementById('editForm__d8').checked ||
                            document.getElementById('editForm__d10').checked ||
                            document.getElementById('editForm__d12').checked ||
                            document.getElementById('editForm__d20').checked) {
                                if (document.getElementById('editForm__hitPointsModInput').value != '') {
                                    return true;
                                }
                            }
                    }
                }
            }
            return false;
        }

        return true;

    }

    sendCharacterDataBack() {

        if (!this.validateForm()) {
            alert('all required fields must be filled');
            return;
        }

        let u;
        if (!this.props.npc) {
            u = true;
        }
        else {
            if (document.getElementById('editForm__nameInput').value == '') {
                u = false;
            }
            else {
                u = true;
            }
        }

        let newCharacter = {
            id:                Date.now(),
            pc:                this.props.npc ? false : true,
            unique:            u,
            name:              document.getElementById('editForm__nameInput').value,
            race:              document.getElementById('editForm__raceInput').value,
            passivePerception: document.getElementById('editForm__passivePerceptionInput').value,
            dexterity:         document.getElementById('editForm__dexterityInput').value,
            hitPoints:         this.props.npc ? document.getElementById('editForm__hitPointsInput').value : '',
            hitDiceCount:      this.props.npc ? document.getElementById('editForm__hitDiceInput').value : '',
            d4:                this.props.npc ? document.getElementById('editForm__d4').checked : false,
            d6:                this.props.npc ? document.getElementById('editForm__d6').checked : false,
            d8:                this.props.npc ? document.getElementById('editForm__d8').checked : false,
            d10:               this.props.npc ? document.getElementById('editForm__d10').checked : false,
            d12:               this.props.npc ? document.getElementById('editForm__d12').checked : false,
            d20:               this.props.npc ? document.getElementById('editForm__d20').checked : false,
            hitPointsModifier: this.props.npc ? document.getElementById('editForm__hitPointsModInput').value : '',
            pageNumber:        this.props.npc ? document.getElementById('editForm__pageNumberInput').value : ''
        }

        this.clearForm();
        this.props.save(newCharacter);

    }

    render() {

        let elem = ''
        if (this.props.npc) {
            elem = (
                <Fragment>
                    <div>
                        <label>Hit Points: </label>
                        <input type='number' id='editForm__hitPointsInput' />
                    </div>
                    <div>
                        <label>Hit Dice: </label>
                        <input type='number' id='editForm__hitDiceInput' />
                    </div>
                    <div className='editForm__npcHitDice'>
                        <div className='editForm__npcHitDice--left'>
                            <input type="radio" name="hitDice" id='editForm__d4' />d4
                            <input type="radio" name="hitDice" id='editForm__d6' />d6
                            <input type="radio" name="hitDice" id='editForm__d8' />d8
                        </div>
                        <div className='editForm__npcHitDice--right'>
                            <input type="radio" name="hitDice" id='editForm__d10' />d10
                            <input type="radio" name="hitDice" id='editForm__d12' />d12
                            <input type="radio" name="hitDice" id='editForm__d20' />d20
                        </div>
                    </div>
                    <div>
                        <label>Hit Points Modifier: </label>
                        <input type='number' id='editForm__hitPointsModInput' />
                    </div>
                    <div>
                        <label>Page Number: </label>
                        <input type='number' id='editForm__pageNumberInput' />
                    </div>
                </Fragment>
            );
        }

        return(
            <form id='editForm' className={`editForm${this.props.appState == 'form displayed' ? '' : ' hide'}`}>
                <fieldset className='editForm__border'>
                    <legend className='editForm__header'>{this.props.create ? 'Create ' : 'Edit '}{this.props.npc ? 'NPC' : 'PC'}</legend>
                    <div>
                        <label>Name: </label>
                        <input type="text" id='editForm__nameInput' />
                    </div>
                    <div>
                        <label>Race: </label>
                        <input type="text" id='editForm__raceInput' />
                    </div>
                    <div>
                        <label>Passive Perception: </label>
                        <input type="number" id='editForm__passivePerceptionInput' />
                    </div>
                    <div>
                        <label>Dexterity: </label>
                        <input type="number" id='editForm__dexterityInput' />
                    </div>
                    {elem}
                </fieldset>
                <div>
                    <button type='button' onClick={this.sendCharacterDataBack.bind(this)}>Save</button>
                    <button type='button' onClick={this.cancelForm.bind(this)}>Go Back</button>
                </div>
            </form>
        );
    }

}

export { CharacterForm };

//export { PCForm, NPCForm };