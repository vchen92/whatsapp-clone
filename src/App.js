import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';

import './App.css';
import { useStateValue } from './hoc/StateProvider/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

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
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>      
      )}
    </div>			
  );
}

export default App;
