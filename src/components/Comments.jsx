import React from 'react';
import { useState, useEffect } from 'react';
import { getArticleComments } from '../utils/api';

const Comments = ({article_id}) => {
    const [comments, setComments] = useState([]);
    const [err, setErr] = useState(null);

    useEffect(() => {
        setErr(null);
        getArticleComments(article_id).then((comments) => {
            setComments(comments);
        }).catch((err) => {
            setErr(err.response.data.msg)
        })
        
    }, [article_id])
    
    if (err) return <p>{err}</p>
    
   return (
        <div className="comments-section">
           <h2>Comments</h2>
            <ul>
                {comments.map(comment => {
                    return (
                      <li key={comment.comment_id}>
                        <p>{comment.body}</p>
                        <p>{comment.author}</p>
                        <p>{comment.votes}</p>
                        <p>{comment.created_at}</p>
                      </li>);
                })}
            </ul>
        </div>
    );
};

export default Comments;