import React, { Fragment } from 'react';
import update from 'react-addons-update';
import { PCForm, NPCForm } from '../CharacterForms/CharacterForms.js';
import CharacterEntry from '../CharacterEntry/CharacterEntry.js';

import '../../styles/styles-reset.css';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characterList: [],
            appState: 'start',
            create: true,
            editId: null
        };
    }

    // TOGGLE FUNCTIONS
    toggleOpeningMenuRunningTheGame() {
        document.getElementById('openingMenu').classList.toggle('hide');
        document.getElementById('runningTheGame').classList.toggle('hide');
    }

    toggleRunningTheGameEditMenu() {
        document.getElementById('runningTheGame').classList.toggle('hide');
        document.getElementById('editMenu').classList.toggle('hide');
    }

    toggleEditMenuPCForm() {
        document.getElementById('editMenu').classList.toggle('hide');
        document.getElementById('editForm--pc').classList.toggle('hide');
    }

    toggleEditMenuNPCForm() {
        document.getElementById('editMenu').classList.toggle('hide');
        document.getElementById('editForm--npc').classList.toggle('hide');
    }

    // SETTING EDIT AND CREATE STATES
    setEditState(c, i = 0) {
        this.setState({
            create: c,
            i: i == 0 ? null : i
        });
    }

    cancelPCFormEdit() {
        this.toggleEditMenuPCForm();
        this.setEditState(true);
    }

    cancelNPCFormEdit() {
        this.toggleEditMenuNPCForm();
        this.setEditState(true);
    }

    // SAVE CHARACTER FUNCTIONS
    saveCharacterData(newCharacter) {
        if (this.state.create) {
            this.setState( {
                characterList: this.state.characterList.concat(newCharacter)
            } );
        }
        else {
            for (let i = 0; i < this.state.characterList.length; i++) {
                if (this.state.characterList[i].id == this.state.editId) {
                    this.setState(update(this.state, {
                        characterList: {
                            [i]: {
                                $set: newCharacter
                            }
                        }
                    }));
                }
            }
            this.setEditState(true);
        }

        newCharacter.pc ? this.toggleEditMenuPCForm() : this.toggleEditMenuNPCForm();
    }

    editCharacter(characterId) {
        for (let i = 0; i < this.state.characterList.length; i++) {
            if (this.state.characterList[i].id == characterId) {
                
                this.setEditState(false, characterId);

                if (this.state.characterList[i].pc) {
                    this.toggleEditMenuPCForm();
                    document.getElementById('editForm__nameInput--pc').value = this.state.characterList[i].name;
                    document.getElementById('editForm__raceInput--pc').value = this.state.characterList[i].race;
                    document.getElementById('editForm__passivePerceptionInput--pc').value = this.state.characterList[i].passivePerception;
                    document.getElementById('editForm__dexterityInput--pc').value = this.state.characterList[i].dexterity;
                }

                else {
                    this.toggleEditMenuNPCForm();
                    document.getElementById('editForm__nameInput--npc').value = this.state.characterList[i].name;
                    document.getElementById('editForm__raceInput--npc').value = this.state.characterList[i].race;
                    document.getElementById('editForm__passivePerceptionInput--npc').value = this.state.characterList[i].passivePerception;
                    document.getElementById('editForm__dexterityInput--npc').value = this.state.characterList[i].dexterity;
                    document.getElementById('editForm__hitPointsInput--npc').value = this.state.characterList[i].hitPoints;
                    document.getElementById('editForm__hitDiceInput--npc').value = this.state.characterList[i].hitDiceCount;
                    document.getElementById('editForm__hitPointsModInput--npc').value = this.state.characterList[i].hitPointsModifier;
                    document.getElementById('editForm__pageNumberInput--npc').value = this.state.characterList[i].pageNumber;
                    switch(this.state.characterList[i].hitDice) {
                        case 4:
                            document.getElementById('editForm__d4--npc').checked = true;
                            break;
                        case 6:
                            document.getElementById('editForm__d6--npc').checked = true;
                            break;
                        case 8:
                            document.getElementById('editForm__d8--npc').checked = true;
                            break;
                        case 10:
                            document.getElementById('editForm__d10--npc').checked = true;
                            break;
                        case 12:
                            document.getElementById('editForm__d12--npc').checked = true;
                            break;
                        case 20:
                            document.getElementById('editForm__d20--npc').checked = true;
                    }
                }

            }
        }
    }

    deleteCharacter(characterId) {

        if (!confirm('Are you sure you want to delete this character?')) {
            return;
        }

        for (let i = 0; i < this.state.characterList.length; i++) {
            if (this.state.characterList[i].id == characterId) {
                let newArr = this.state.characterList;
                newArr.splice(i, 1);
                this.setState({
                    characterList: newArr
                });
            }
        }

    }

    render() {
        return(
            <Fragment>
                <h1>Dungeons &amp; Dragons: Encounter Manager</h1>
                <div id='main'>
                    <div id='appSide'>
                        <div id='openingMenu'>
                            <button type='button' onClick={this.toggleOpeningMenuRunningTheGame.bind(this)}>Start New Session</button>
                            <button type='button'>Load Session</button>
                        </div>
                        <div id='runningTheGame' className='hide'>
                            <button type='button' onClick={this.toggleRunningTheGameEditMenu.bind(this)}>Edit Session</button>
                            <button type='button'>Save Session</button>
                            <button type='button'>Start New Encounter</button>
                            <button type='button' onClick={this.toggleOpeningMenuRunningTheGame.bind(this)}>Back to Home</button>
                        </div>
                        <div id='editMenu' className='hide'>
                            <button type='button' onClick={this.toggleEditMenuPCForm.bind(this)}>Add PC</button>
                            <button type='button' onClick={this.toggleEditMenuNPCForm.bind(this)}>Add NPC</button>
                            <button type='button' onClick={this.toggleRunningTheGameEditMenu.bind(this)}>Done Editing</button>
                        </div>
                        <PCForm header={`${this.state.create ? 'Create' : 'Edit' } PC`}
                                saveCharacterData={this.saveCharacterData.bind(this)}
                                hideThisForm={this.cancelPCFormEdit.bind(this)}/>
                        <NPCForm header={`${this.state.create ? 'Create ' : 'Edit '} NPC`}
                                 saveCharacterData={this.saveCharacterData.bind(this)}
                                 hideThisForm={this.cancelNPCFormEdit.bind(this)}/>
                    </div>
                    <div id='characterList' className={this.state.characterList.length == 0 ? 'hide' : ''}>
                        <fieldset id='characterList__border'>
                            <legend id='characterList__header'>Character List</legend>
                            <p id='characterList__helper'>* unique character</p>
                            <div id='characterList__mainList'>
                                {this.state.characterList.map(c => (
                                    <CharacterEntry key={c.id}
                                                    create={this.state.create}
                                                    characterIndex={c.id}
                                                    isUnique={c.unique}
                                                    name={c.name != '' ? c.name : c.race}
                                                    passivePerception={c.passivePerception}
                                                    edit={this.editCharacter.bind(this)}
                                                    delete={this.deleteCharacter.bind(this)}/>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default App;