import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { SwitchPrincipal } from './SwitchPrincipal';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LoginForm } from './pages/login/LoginForm.jsx';
import { SiderMenu } from './SiderMenu/SiderMenu';
import { Signout } from './pages/signout/Signout';
import { Load } from './pages/load/Load';
import { AppHeader } from './AppHeader/AppHeader';

const { Sider, Content } = Layout;

function App() {
  const [authorisation, setAuthorisation] = useState({
    isAuthenticated: true,
  });
  window.baseURL = 'http://dev.nextsetp.ovh';
  window.isLocalDevState = true;
  window.testAcces = '?login=wpeilhon&mdp=xool';

  console.log('App authorisation ', authorisation, Date.now());
  return (
    <Layout className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/load">
            <Load
              authorisation={authorisation}
              setAuthorisation={setAuthorisation}
            />
          </Route>
          <Route exact path="/login">
            <LoginForm
              authorisation={authorisation}
              setAuthorisation={setAuthorisation}
            />
          </Route>
          <Route exact path="/signout">
            <Signout setAuthorisation={setAuthorisation} />
          </Route>
          <Route path="*">
            <Sider breakpoint="lg" collapsedWidth="0">
              <SiderMenu />
            </Sider>
            <Layout>
              <AppHeader />
              <Content
                className="content"
                style={{ margin: 'auto', paddingBottom: 200, maxWidth: 1300 }}
              >
                <SwitchPrincipal authorisation={authorisation} />
              </Content>
            </Layout>
          </Route>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
