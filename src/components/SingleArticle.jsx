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
 

  useEffect(() => {
    getArticleByID(article_id)
      .then((article) => {
        setErr(null);
        setArticle(article);
        setVotes(article.votes);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
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
        <h2>{article.title}</h2>
        <p>By: {article.author}</p>
        <p className="date">Date: {article.created_at}</p>
      </section>
      <p className="article-body">{article.body}</p>
      <h2>Likes:{votes}</h2>
      {currentUser && (
        <section className="vote-buttons">
          <button
            onClick={() => {
              setVotes((currVotes) => {
                setNewVote(1);
                return currVotes + 1;
              });
            }}
          >
            upVote
          </button>
          <button
            onClick={() => {
              setVotes((currVotes) => {
                setNewVote(-1);
                return currVotes - 1;
              });
            }}
          >
            Downvote
          </button>
        </section>
      )}
      {!currentUser}
      <p>Log in to like or leave a comment on this article</p>
      <Comments article_id={article_id} />
    </section>
  );
};

export default SingleArticle;