import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import Login from './Login';
import { UserContext } from '../conetxts/User';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);
   
    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
        });
    }, [])
  
    return (
      <div className="Nav">
        <Link to="/">Home</Link>
        {topics.map((topic) => {
          return (
            <Link
              className="topic-link"
              key={topic.slug}
              to={`/articles/topic/${topic.slug}`}
            >
              {topic.slug}
            </Link>
          );
        })}
        <Login />
        
      </div>
    );
};

export default Nav;