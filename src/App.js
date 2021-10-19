import './App.css';
import { useState } from 'react';
import Articles from './components/Articles';
import Header from './components/Header';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';

function App() {
   const [currentUser, setCurrentUser] = useState();
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Nav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/articles/topic/:slug">
            <Articles />
          </Route>
          <Route exact path="/articles/:article_id">
            <SingleArticle currentUser={currentUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
