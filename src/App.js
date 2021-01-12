import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import List from './components/List';
import AddItem from './components/AddItem';
import Nav from './components/Nav';
import './styles/App.css';
import CreateList from './components/CreateList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/list">
          <List />
        </Route>
        <Route path="/addItem">
          <AddItem />
        </Route>
      </Switch>
      {localStorage.getItem('newToken') ? (
        <Redirect to="/list" />
      ) : (
        <CreateList />
      )}
      <Nav />
    </div>
  );
}

export default App;
