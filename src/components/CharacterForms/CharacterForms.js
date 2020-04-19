import React from 'react';

import './CharacterForms.css';

class PCForm extends React.Component {

    constructor(props) {
        super(props);
    }

    clearForm() {

        let ids = [
            'editForm__nameInput--pc',
            'editForm__raceInput--pc',
            'editForm__passivePerceptionInput--pc',
            'editForm__dexterityInput--pc'
        ];

        for (let i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).value = '';
        }

    }

    cancelForm() {
        if (confirm('Are you sure? Any unsaved data will be lost.')) {
            this.clearForm();
            this.props.hideThisForm();
        }
    }

    validateForm() {
        if (document.getElementById('editForm__nameInput--pc').value != '') {
            if (document.getElementById('editForm__raceInput--pc').value != '') {
                if (document.getElementById('editForm__passivePerceptionInput--pc').value != '') {
                    if (document.getElementById('editForm__dexterityInput--pc').value != '') {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    sendPCDataBack() {
        if (!this.validateForm()) {
            alert('all required fields must be filled');
            return;
        }
        let newCharacter = {
            id: Date.now(),
            pc: true,
            unique: true,
            name: document.getElementById('editForm__nameInput--pc').value,
            race: document.getElementById('editForm__raceInput--pc').value,
            passivePerception: document.getElementById('editForm__passivePerceptionInput--pc').value,
            dexterity: document.getElementById('editForm__dexterityInput--pc').value,
            hitPoints: '',
            hitDiceCount: '',
            hitDice: '',
            hitPointsModifier: '',
            pageNumber: 'null'
        }
        this.clearForm();
        this.props.saveCharacterData(newCharacter);
    }

    render() {
        return(
            <form id='editForm--pc' className='editForm hide'>
                <fieldset className='editForm__border'>
                    <legend className='editForm__header'>{this.props.header}</legend>
                    <div>
                        <label>Name: </label>
                        <input type="text" id='editForm__nameInput--pc' />
                    </div>
                    <div>
                        <label>Race: </label>
                        <input type="text" id='editForm__raceInput--pc' />
                    </div>
                    <div>
                        <label>Passive Perception: </label>
                        <input type="number" id='editForm__passivePerceptionInput--pc' />
                    </div>
                    <div>
                        <label>Dexterity: </label>
                        <input type="number" id='editForm__dexterityInput--pc' />
                    </div>
                </fieldset>
                <div>
                    <button type='button' onClick={this.sendPCDataBack.bind(this)}>Save PC</button>
                    <button type='button' onClick={this.cancelForm.bind(this)}>Go Back</button>
                </div>
            </form>
        );
    }

}

class NPCForm extends React.Component {

    constructor(props) {
        super(props);
    }

    clearForm() {

        let ids = [
            'editForm__nameInput--npc',
            'editForm__raceInput--npc',
            'editForm__passivePerceptionInput--npc',
            'editForm__dexterityInput--npc',
            'editForm__hitPointsInput--npc',
            'editForm__hitDiceInput--npc',
            'editForm__hitPointsModInput--npc',
            'editForm__pageNumberInput--npc'
        ];

        for (let i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).value = '';
        }

        let radioBtns = [
            'editForm__d4--npc',
            'editForm__d6--npc',
            'editForm__d8--npc',
            'editForm__d10--npc',
            'editForm__d12--npc',
            'editForm__d20--npc'
        ];

        for (let i = 0; i < radioBtns.length; i++) {
            document.getElementById(radioBtns[i]).checked = false;
        }

    }

    cancelForm() {
        if (confirm('Are you sure? Any unsaved data will be lost.')) {
            this.clearForm();
            this.props.hideThisForm();   
        }
    }

    validateForm() {

        if (document.getElementById('editForm__raceInput--npc').value != '') {
            if (document.getElementById('editForm__passivePerceptionInput--npc').value != '') {
                if (document.getElementById('editForm__dexterityInput--npc').value != '') {
                    if (document.getElementById('editForm__pageNumberInput--npc').value != '') {
                        if (document.getElementById('editForm__hitPointsInput--npc').value != '') {
                            return true;
                        }
                        else {
                            if (document.getElementById('editForm__hitDiceInput--npc').value != '') {
                                if (document.getElementById('editForm__d4--npc').checked || 
                                    document.getElementById('editForm__d6--npc').checked ||
                                    document.getElementById('editForm__d8--npc').checked ||
                                    document.getElementById('editForm__d10--npc').checked ||
                                    document.getElementById('editForm__d12--npc').checked ||
                                    document.getElementById('editForm__d20--npc').checked) {
                                        if (document.getElementById('editForm__hitPointsModInput--npc').value != '') {
                                            return true;
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }
        return false;

    }

    sendNPCDataBack() {

        if (!this.validateForm()) {
            alert('all required fields must be filled');
            return;
        }

        let hitDiceEval = null;
        if (document.getElementById('editForm__d4--npc').checked) {
            hitDiceEval = 4;
        }
        else {
            if (document.getElementById('editForm__d6--npc').checked) {
                hitDiceEval = 6;
            }
            else {
                if (document.getElementById('editForm__d8--npc').checked) {
                    hitDiceEval = 8;
                }
                else {
                    if (document.getElementById('editForm__d10--npc').checked) {
                        hitDiceEval = 10;
                    }
                    else {
                        if (document.getElementById('editForm__d12--npc').checked) {
                            hitDiceEval = 12;
                        }
                        else {
                            if (document.getElementById('editForm__d20--npc').checked) {
                                hitDiceEval = 20;
                            }
                        }
                    }
                }
            }
        }

        let newCharacter = {
            id: Date.now(),
            pc: false,
            unique: document.getElementById('editForm__nameInput--npc') != '' ? true : false,
            name: document.getElementById('editForm__nameInput--npc').value,
            race: document.getElementById('editForm__raceInput--npc').value,
            passivePerception: document.getElementById('editForm__passivePerceptionInput--npc').value,
            dexterity: document.getElementById('editForm__dexterityInput--npc').value,
            hitPoints: document.getElementById('editForm__hitPointsInput--npc').value,
            hitDiceCount: document.getElementById('editForm__hitDiceInput--npc').value,
            hitDice: hitDiceEval,
            hitPointsModifier: document.getElementById('editForm__hitPointsModInput--npc').value,
            pageNumber: document.getElementById('editForm__pageNumberInput--npc').value
        }
        this.clearForm();
        this.props.saveCharacterData(newCharacter);
    }

    render() {
        return(
            <form id='editForm--npc' className='editForm hide'>
                <fieldset className='editForm__border'>
                    <legend className='editForm__header'>{this.props.header}</legend>
                    <div>
                        <label>Name: </label>
                        <input type="text" id='editForm__nameInput--npc' />
                    </div>
                    <div>
                        <label>Race: </label>
                        <input type="text" id='editForm__raceInput--npc' />
                    </div>
                    <div>
                        <label>Passive Perception: </label>
                        <input type="number" id='editForm__passivePerceptionInput--npc' />
                    </div>
                    <div>
                        <label>Dexterity: </label>
                        <input type="number" id='editForm__dexterityInput--npc' />
                    </div>
                    <div>
                        <label>Hit Points: </label>
                        <input type='number' id='editForm__hitPointsInput--npc' />
                    </div>
                    <div>
                        <label>Hit Dice: </label>
                        <input type='number' id='editForm__hitDiceInput--npc' />
                    </div>
                    <div className='editForm__npcHitDice'>
                        <div className='editForm__npcHitDice--left'>
                            <input type="radio" name="hitDice" id='editForm__d4--npc' />d4
                            <input type="radio" name="hitDice" id='editForm__d6--npc' />d6
                            <input type="radio" name="hitDice" id='editForm__d8--npc' />d8
                        </div>
                        <div className='editForm__npcHitDice--right'>
                            <input type="radio" name="hitDice" id='editForm__d10--npc' />d10
                            <input type="radio" name="hitDice" id='editForm__d12--npc' />d12
                            <input type="radio" name="hitDice" id='editForm__d20--npc' />d20
                        </div>
                    </div>
                    <div>
                        <label>Hit Points Modifier: </label>
                        <input type='number' id='editForm__hitPointsModInput--npc' />
                    </div>
                    <div>
                        <label>Page Number: </label>
                        <input type='number' id='editForm__pageNumberInput--npc' />
                    </div>
                </fieldset>
                <div>
                    <button type='button' onClick={this.sendNPCDataBack.bind(this)}>Save NPC</button>
                    <button type='button' onClick={this.cancelForm.bind(this)}>Go Back</button>
                </div>
            </form>
        );
    }

}

export { PCForm, NPCForm };