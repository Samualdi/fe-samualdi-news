import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../conetxts/User';
import { getArticleComments, postComment } from '../utils/api';

const Comments = ({ article_id }) => {
    const [comments, setComments] = useState([]);
    const [newUserComment, setnewUserComment] = useState("");
    const [userComment, setUserComment] = useState("");
    const [err, setErr] = useState(null);
    const { currentUser } = useContext(UserContext);


    useEffect(() => {
        setErr(null);
        getArticleComments(article_id).then((comments) => {
            setComments(comments);
        }).catch((err) => {
            setErr(err.response.data.msg)
        })
        
    }, [article_id, comments])

    useEffect(() => {
        if (userComment) {
            postComment(article_id, currentUser.username, userComment).then((newComment) => {
                console.log(newComment)
            }).catch((err) => {
                console.dir(err.response.data.msg);
            })
            
        }
        
    }, [userComment])
    
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
               {(err && <p>Something went wrong with loading comments!</p>)}
           </ul>
           <h2>Add a comment</h2>
           <form onSubmit={(e) => {
               e.preventDefault();
               setUserComment(newUserComment);
               setnewUserComment('');
           }}>
               <textarea name="comment-box" id="commentbox" cols="30" rows="10" value={newUserComment} onChange={(e) => {
                   setnewUserComment(e.target.value)
               }}></textarea>
               <button type="submit">Post</button>
           </form>
        </div>
    );
};

export default Comments;