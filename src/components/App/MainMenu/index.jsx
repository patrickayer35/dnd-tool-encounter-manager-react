import React, { Fragment, useContext } from 'react';
import { ViewContext } from '../../../lib/context/ViewContext/index.jsx';
import Edit from './Edit/index.jsx'
import Home from './Home/index.jsx'
import Start from './Start/index.jsx'

const MainMenu = () => {
  const { view } = useContext(ViewContext);;

  return (
    <Fragment>
      {view === 'START' && <Start />}
      {view === 'HOME' && <Home />}
      {view === 'EDIT' && <Edit />}
    </Fragment>
  );
};

export default MainMenu;