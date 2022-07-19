import Home from './Home';
import TrashBin from './TrashBin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header"> 
          <h1>ToDo App</h1>
        </div>
        <div className="content">
          <Switch>
            <Route exact path = "/">
              <Home/>
            </Route>

            <Route exact path = "/trashbin">
              <TrashBin/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
