import React from 'react';
import { useState, useEffect } from 'react';
import { findUser, getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import Login from './Login';

const Nav = ({ currentUser, setCurrentUser }) => {
  const [topics, setTopics] = useState([]);
   
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
        <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        
      </div>
    );
};

export default Nav;