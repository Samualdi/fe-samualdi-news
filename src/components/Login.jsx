import React from 'react';
import { findUser } from '../utils/api';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';

const Login = () => {
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState("");
    const [err, setErr] = useState(null);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

     useEffect(() => {
       if (user) {
         setLoading(true);
         findUser(user)
           .then((userData) => {
             setCurrentUser(userData);
             setLoading(false);
           })
           .catch((err) => {
             if (err.response.data.msg) {
               setErr(err.response.data.msg);
             } 
            setErr("Login failed. Please try again.");
             setLoading(false);
           });
       }
     }, [user, setCurrentUser]);

     useEffect(() => {
       if (currentUser) {
         localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
       }
     }, [currentUser]);
    
    
    if (!currentUser)
      return (
        <div>
          {loading && <p>Finding user...</p>}
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setUser(newUser);
              setNewUser("");
            }}
          >
            <label htmlFor="username"></label>
            <input
              type="text"
              placeholder="Enter a username..."
              required
              value={newUser}
              onChange={(e) => {
                setErr(null);
                setNewUser(e.target.value);
              }}
            />
            <button type="submit">Log in!</button> {err && <span>{err}</span>}
          </form>
        </div>
      );

    return (
      <div>
        <p>Logged in as {currentUser.username}</p>
        <button
          onClick={() => {
            setCurrentUser("");
            setUser("");
            localStorage.removeItem("loggedInUser");
          }}
        >
          Log out!
        </button>
      </div>
    );
};

export default Login;