import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Spin } from 'antd';

import API from './containers/API/API';
import Error404 from './components/Error404';
import Invoices from './containers/Invoices/Invoices';
import MainApp from './containers/MainApp/MainApp';
import './App.css';

const App = (props) => {

  const [api,] = useState(new API());
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.appConfig({
      props,
      setState: setConfig
    })
  }, [])

  return (

    <BrowserRouter>
      <Route render={(history) =>
        <div className="App">
          <header className="App-header">
            <Link to={`${history.location.pathname.includes('/paymentApp') ? '/paymentApp':''}/`}>
              <label className="App-title">
                {config ? config.name : 'App'}
              </label>
            </Link>
          </header>
          <div className="container">
            {config ?
              <Switch>
                <Route path={`${history.location.pathname.includes('paymentApp') ? '/paymentApp' : ''}/invoices`} component={() => <Invoices config={config} />} />
                <Route path={`${history.location.pathname.includes('paymentApp') ? '/paymentApp' : ''}/`} component={() => <MainApp config={config} />} />
                <Route component={Error404} />
              </Switch>
              : <Spin />}
          </div>
        </div>
      } />
    </BrowserRouter>
  );
}

export default App;
