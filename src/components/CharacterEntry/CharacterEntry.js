import React from 'react';

import './CharacterEntry.css';

class CharacterEntry extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='characterList__character'>
                <button className='characterList__nameBtn'
                        disabled={this.props.appState == 'encounter staging' ? false : true}
                        onClick={() => (this.props.addToEncounter(this.props.characterIndex))}>{this.props.isUnique ? '*' : ''}{this.props.name}</button>
                <button className='characterList__editBtn'
                        disabled={this.props.appState == 'edit' ? false : true}
                        onClick={() => (this.props.edit(this.props.characterIndex))}>Edit</button>
                <button className='characterList__deleteBtn'
                        disabled={this.props.appState == 'edit' ? false : true}
                        onClick={() => (this.props.delete(this.props.characterIndex))}>Delete</button>
                <div className='characterList__passivePerceptionDisplay'>PP: {this.props.passivePerception}</div>
            </div>
        );
    }

}

export { CharacterEntry };