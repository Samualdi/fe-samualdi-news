import React from 'react';
import { useState, useEffect } from 'react';
import { getTopics } from '../utils/api';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics);
        });
        
    }, [])
    return (
        <div className="Nav">
            {topics.map(topic => {
                return <Link className="topic-link" key={topic.slug} to={`/articles/topic/${topic.slug}`}>{topic.slug}</Link>
                })}
        </div>
    );
};

export default Nav;