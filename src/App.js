import './App.css';
import { useState } from 'react';
import Articles from './components/Articles';
import Header from './components/Header';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';
import { UserContext } from './contexts/User';

function App() {
   const [currentUser, setCurrentUser] = useState();
  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <BrowserRouter>
        <Header />
        <Nav/>
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/articles/topic/:slug">
            <Articles />
          </Route>
          <Route exact path="/articles/:article_id">
            <SingleArticle/>
          </Route>
        </Switch>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
