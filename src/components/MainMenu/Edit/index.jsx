import React, { Fragment, useContext } from 'react';
import { ViewContext, ADD_PC, ADD_NPC, HOME } from '../../../lib/Context/View.jsx';

const Edit = () => {
  const { setView } = useContext(ViewContext);
  
  return (
    <Fragment>
      <button onClick={() => setView(ADD_PC)}>Add PC</button>
      <button onClick={() => setView(ADD_NPC)}>Add NPC</button>
      <button onClick={() => setView(HOME)}>Done Editing</button>
    </Fragment>
  );
}

export default Edit;