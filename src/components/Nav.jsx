import React from 'react';
import { useState, useEffect } from 'react';

const Nav = () => {
    const [topics, setTopics] = useState([]);
    return (
        <div className="Nav">
            <h1>This is the Nav bar</h1>
        </div>
    );
};

export default Nav;