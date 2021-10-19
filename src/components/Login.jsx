import React from 'react';
import { findUser } from '../utils/api';
import { useState, useEffect } from 'react';

const Login = ({currentUser, setCurrentUser}) => {
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState("");
    const[err, setErr]= useState("")

     useEffect(() => {
       if (user) {
         findUser(user).then((userData) => {
           setCurrentUser(userData);
         }).catch((err) => {
             setErr(err.response.data.msg);
         })
       }
     }, [user]);
    
    if (err) return (
      <div>
            <p>{err}</p>
            <form onSubmit={() => {
            }}>
                <button>Try again!</button>
            </form>
      </div>
    );

    
    if(!currentUser) return (
      <div>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            setUser(newUser);
            setNewUser("");
          }}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            value={newUser}
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
          />
          <button type="submit">Log in!</button>
            </form>
            </div>
    );

    return (
      <div>
        <img src={currentUser.avatar_url} alt={currentUser.username} />
        <p>{currentUser.username}</p>
        <button
          onClick={() => {
            setCurrentUser("");
            setUser("");
          }}
        >
          Log out!
        </button>
      </div>
    );
};

export default Login;