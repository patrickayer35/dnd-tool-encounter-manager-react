import React from 'react';

import './CharacterEntry.css';

/*
props array includes:
isUnique { boolean } : character is unique
name {string} : character's name
passivePerception { integer } : character's passive perception
*/
class CharacterEntry extends React.Component {

    constructor(props) {
        super(props);
    }

    editCharacter() {

    }

    deleteCharacter() {

    }

    render() {
        return(
            <div className='characterList__character'>
                <button className='characterList__characterName'>{this.props.isUnique ? '*' : ''}{this.props.name}</button>
                <button onClick={this.editCharacter.bind(this)}>Edit</button>
                <button onClick={this.deleteCharacter.bind(this)}>Delete</button>
                <div className='characterList__characterPassPerc'>PP: {this.props.passivePerception}</div>
            </div>
        );
    }

}

export default CharacterEntry;