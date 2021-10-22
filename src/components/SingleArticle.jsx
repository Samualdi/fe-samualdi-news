import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import { getArticleByID, incArticleVote } from '../utils/api';
import { UserContext } from '../contexts/User';
import Comments from './Comments';

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [err, setErr] = useState(null);
    const [votes, setVotes] = useState(0);
  const [newVote, setNewVote] = useState(0);
  const { currentUser } = useContext(UserContext);
  const { article_id } = useParams();
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setErr(null);
    setLoading(true)
    getArticleByID(article_id)
      .then((article) => {
        setArticle(article);
        setVotes(article.votes)
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.msg) {
          setErr(err.response.data.msg);
        } else {
          setErr('Something went wrong. Please refresh to try again...')
        }
        setLoading(false);

      });
  }, [article_id]);
    
    useEffect(() => {
        if (newVote) {
            incArticleVote(article_id, newVote).then(() => {
                  setNewVote(0);
            }).catch((err) => {
                setVotes(currVotes => {
                    if (newVote > 0) {
                        setNewVote(0)
                        return currVotes - 1;
                    } else {
                        setNewVote(0);
                         return currVotes + 1;
                    }
                
                })
                
            })
        }
        
    }, [newVote])
  

  if (err) return <p>{err}</p>;
  return (
    <section className="single-article">
      <section className="single-article-info">
        {loading && <p>Loading...</p>}
        <h2>{article.title}</h2>
        <p>By: {article.author}</p>
        <p className="date">Date: {article.created_at}</p>
      </section>
      <p className="article-body">{article.body}</p>
      {(!currentUser && <p>Log in to like and comment!</p> )}
      <section className="vote-buttons"></section>
      {currentUser && (
        <section className="vote-buttons">
          <button
            className="upVote"
            onClick={() => {
              setVotes((currVotes) => {
                setNewVote(1);
                return currVotes + 1;
              });
            }}
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/cute-emoji-smiles-with-gradient/83/In_Love_Emoji_Emoticon_Feeling_Face_Smile-512.png"
              alt="thumbs up icon"
            ></img>
          </button>
          <button
            className="downVote"
            onClick={() => {
              setVotes((currVotes) => {
                setNewVote(-1);
                return currVotes - 1;
              });
            }}
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/e-face/128/_Angry_Face-256.png"
              alt="sad face icon"
            ></img>
          </button>
        </section>
      )}
      <h2>Likes:{votes}</h2>
      <Comments article_id={article_id} />
    </section>
  );
};

export default SingleArticle;