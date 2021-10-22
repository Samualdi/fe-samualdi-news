import './App.css';
import { useState, useEffect } from 'react';
import Articles from './components/Articles';
import Header from './components/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';
import { UserContext } from './contexts/User';

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const prevLoggedInUser = localStorage.getItem('loggedInUser');
    if (prevLoggedInUser) {
      setCurrentUser(JSON.parse(prevLoggedInUser));
    }
  }, [])
  
  
  return (
    <div className="App">
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <BrowserRouter>
        <Header />
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
