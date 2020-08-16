import React, { Fragment, useContext } from 'react';
import { ViewContext } from '../../lib/Context/View.jsx';
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