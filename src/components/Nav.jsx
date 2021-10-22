import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';
import Login from './Login';


const Nav = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  

   
  useEffect(() => {
      setLoading(true)
        getTopics().then((topics) => {
          setTopics(topics);
          setLoading(false);
        }).catch(() => {
          setErr('Failed to load topics');
          setLoading(false);
        });
    }, [])
  
    return (
      <div className="Nav">
        {(loading && <p>Loading...</p>)}
        {(err && <p>{err}</p>)}
        <Link to="/" className="topic-link">Home</Link>
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
        <Login className="login-form"/>
        
      </div>
    );
};

export default Nav;