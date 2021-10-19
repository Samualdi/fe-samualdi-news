import './App.css';
import Articles from './components/Articles';
import Header from './components/Header';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SingleArticle from './components/SingleArticle';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route exact path="/articles/topic/:slug">
            <Articles />
          </Route>
          <Route exact path="/articles/:article_id">
            <SingleArticle />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
