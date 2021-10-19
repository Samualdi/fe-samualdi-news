import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticleByID, incArticleVote } from '../utils/api';
import Comments from './Comments';

const SingleArticle = ({currentUser}) => {
  const [article, setArticle] = useState({});
  const [err, setErr] = useState(null);
    const [votes, setVotes] = useState(0);
    const [newVote, setNewVote] = useState(0);
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
            incArticleVote(article_id, newVote).then((updatedArticle) => {
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
    <div>
      <h2>{article.title}</h2>
      <p>By: {article.author}</p>
      <p>{article.body}</p>
      <p>Date: {article.created_at}</p>
      <h2>Votes:{votes}</h2>
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
      <Comments article_id={article_id} currentUser={currentUser}/>
    </div>
  );
};

export default SingleArticle;