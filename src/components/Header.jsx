import React from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/User';
import Nav from './Nav';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser } = useContext(UserContext);


    return (
      <div className="Header">
        <section className="header-icons">
          {" "}
          <button
            className="menu-button"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <img
              className="button-img"
              src="https://cdn-icons-png.flaticon.com/512/151/151409.png"
              alt="menu"
            ></img>
          </button>
          {!currentUser && (
            <img
              className="user-icon"
              alt="no user"
              src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
            ></img>
          )}
          {currentUser && (
            <img
              className="user-icon"
              alt="user avatar"
              src={currentUser.avatar_url}
            ></img>
          )}
        </section>
        <h1 className="samualdi-news-header">Samualdi News</h1>
        {showMenu && <Nav />}
      </div>
    );
};

export default Header;