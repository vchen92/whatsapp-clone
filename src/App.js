import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './Chat/Chat';
import Sidebar from './Sidebar/Sidebar';
import Login from './Login/Login';

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
		<div className="app">

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">{/* <Chat /> */}</Route>
            </Switch>
          </Router>
        </div>      
      )}
    </div>			
  );
}

export default App;
