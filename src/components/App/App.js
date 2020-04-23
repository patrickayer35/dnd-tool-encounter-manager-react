import React, { Fragment } from 'react';
import update from 'react-addons-update';
import { CharacterForm } from '../CharacterForm/CharacterForm.js';
import { CharacterEntry } from '../CharacterEntry/CharacterEntry.js';

import '../../styles/styles-reset.css';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characterList: [],
            encounterList: [],
            appState: 'start',
            formType: 'pc',
            create: true,
            editId: null
        };
    }

    exitToOpeningMenu() {

        if (this.state.characterList.length > 0) {
            if (confirm('Are you sure? All current session data will be lost.')) {
                this.setState( { characterList: [] } );
            }
            else {
                return;
            }
        }

        this.setState( { appState: 'start' } );

    }

    // EDIT CHARACTER FUNCTIONS
    saveCharacterData(newCharacter) {
        if (this.state.create) {
            this.setState( { characterList: this.state.characterList.concat(newCharacter) } );
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
            this.setState( {
                create: true,
                editId: null
            } );
        }
        this.setState( { appState: 'edit' } )
    }

    populateForm(characterId) {

        console.log(this.state);
        
        for (let i = 0; i < this.state.characterList.length; i++) {
            
            if (this.state.characterList[i].id == characterId) {

                this.setState({
                    appState: 'form displayed',
                    formType: this.state.characterList[i].pc ? 'pc' : 'npc',
                    create: false,
                    editId: characterId
                }, () => {

                    document.getElementById('editForm__nameInput').value = this.state.characterList[i].name;
                    document.getElementById('editForm__raceInput').value = this.state.characterList[i].race;
                    document.getElementById('editForm__passivePerceptionInput').value = this.state.characterList[i].passivePerception;
                    document.getElementById('editForm__dexterityInput').value = this.state.characterList[i].dexterity;

                    if (!this.state.characterList[i].pc) {
                        document.getElementById('editForm__hitPointsInput').value = this.state.characterList[i].hitPoints;
                        document.getElementById('editForm__hitDiceInput').value = this.state.characterList[i].hitDiceCount;
                        document.getElementById('editForm__hitPointsModInput').value = this.state.characterList[i].hitPointsModifier;
                        document.getElementById('editForm__pageNumberInput').value = this.state.characterList[i].pageNumber;
                        document.getElementById('editForm__d4').checked = this.state.characterList[i].d4;
                        document.getElementById('editForm__d6').checked = this.state.characterList[i].d6;
                        document.getElementById('editForm__d8').checked = this.state.characterList[i].d8;
                        document.getElementById('editForm__d10').checked = this.state.characterList[i].d10;
                        document.getElementById('editForm__d12').checked = this.state.characterList[i].d12;
                        document.getElementById('editForm__d20').checked = this.state.characterList[i].d20;
                    }

                });

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

    hideForm() {
        this.setState({
            appState: 'edit',
            create: true,
            editId: null
        });
    }

    stageEncounter() {

        if (this.state.characterList.length < 1) {
            alert('You need at least two characters to start an encounter');
            return;
        }

        this.setState({
            appState: 'encounter staging'
        });

    }

    addToEncounter(characterIndex) {



    }

    render() {
        return(
            <Fragment>
                <h1>Dungeons &amp; Dragons: Encounter Manager Dawg</h1>
                <div id='main'>
                    <div id='appSide'>
                        <div id='openingMenu' className={this.state.appState != 'start' ? 'hide' : ''}>
                            <button type='button' onClick={ () => (this.setState( { appState: 'main' } )) }>Start New Session</button>
                            <button type='button'>Load Session</button>
                        </div>
                        <div id='runningTheGame' className={this.state.appState != 'main' ? 'hide' : ''}>
                            <button type='button' onClick={ () => (this.setState( { appState: 'edit' } )) }>Edit Session</button>
                            <button type='button'>Save Session</button>
                            <button type='button' onClick={ this.stageEncounter.bind(this) }>Start New Encounter</button>
                            <button type='button' onClick={ this.exitToOpeningMenu.bind(this) }>Back to Home</button>
                        </div>
                        <div id='editMenu' className={this.state.appState != 'edit' ? 'hide' : ''}>
                            <button type='button' onClick={ () => (this.setState( { appState: 'form displayed', formType: 'pc' } )) }>Add PC</button>
                            <button type='button' onClick={ () => (this.setState( { appState: 'form displayed', formType: 'npc' } )) }>Add NPC</button>
                            <button type='button' onClick={ () => (this.setState( { appState: 'main' } )) }>Done Editing</button>
                        </div>
                        <CharacterForm appState={this.state.appState}
                                       create={this.state.create}
                                       npc={this.state.formType == 'npc' ? true : false}
                                       save={this.saveCharacterData.bind(this)}
                                       goBack={this.hideForm.bind(this)}/>
                        <div id='encounterStaging' className={this.state.appState != 'encounter staging' ? 'hide' : ''}>
                            <fieldset id='encounterStaging__border'>
                                <legend id='encounterStaging__header'>Roll for initiative</legend>
                                <p className='encounterStaging__helper'>Click a character name to add to the encounter</p>
                                <p className='encounterStaging__helper'>All characters marked with an asterisk (*) require an initiative roll</p>
                                <p className='encounterStaging__helper'>Characters not marked with an asterisk will automatically generate an initiative roll</p>
                                <div id='encounterStaging__characterList'>
                                    {this.state.encounterList.map(c => (
                                        <EncounterEntry key={c.id}/>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div id='characterList' className={this.state.characterList.length == 0 ? 'hide' : ''}>
                        <fieldset id='characterList__border'>
                            <legend id='characterList__header'>Character List</legend>
                            <p id='characterList__helper'>* unique character</p>
                            <div id='characterList__mainList'>
                                {this.state.characterList.map(c => (
                                    <CharacterEntry key={c.id}
                                                    appState={this.state.appState}
                                                    characterIndex={c.id}
                                                    isUnique={c.unique}
                                                    name={c.name != '' ? c.name : c.race}
                                                    passivePerception={c.passivePerception}
                                                    addToEncounter={this.addToEncounter.bind(this)}
                                                    edit={this.populateForm.bind(this)}
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