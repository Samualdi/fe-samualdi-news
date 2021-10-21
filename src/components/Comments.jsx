import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { deleteComment, getArticleComments, incArticleVote, incCommentVote, postComment } from '../utils/api';
import "react-toggle/style.css";
import Toggle from 'react-toggle';

const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
    const [newUserComment, setnewUserComment] = useState("");
    const [userComment, setUserComment] = useState("");
    const [err, setErr] = useState(null);
  const [commentErr, setCommentErr] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState();
  const { currentUser } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

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
            setCommentErr(null);
            postComment(article_id, currentUser, userComment).catch((err) => {
                setCommentErr('You must be logged in to post a comment');
            })
        }
    }, [userComment])

  useEffect(() => {
    if (commentToDelete) {
      deleteComment(commentToDelete).then((res) => {
        setCommentToDelete()
      }).catch(() => {
        console.log('failed to delete!')
      })
    }
  }, [commentToDelete])
  
    
  if (err) return <p>{err}</p>
  
    
   return (
     <div className="comments-section">
       <h2>Comments</h2>
       <label>
         <Toggle
           defaultChecked={showComments === true}
           className="comments-toggle"
           onChange={() => { setShowComments(!showComments) }}
         />
       </label>
       {(showComments && <ul>
         {comments.map((comment) => {
           return (
             <li key={comment.comment_id}>
               <p>{comment.body}</p>
               <p>By: {comment.author}</p>
               <p>Date: {comment.created_at}</p>
               {currentUser && (
                 <button
                   disabled={currentUser.username !== comment.author}
                   onClick={() => {
                     setCommentToDelete(comment.comment_id);
                   }}
                 >
                   Delete
                 </button>
               )}
             </li>
           );
         })}
         {err && <p>Something went wrong with loading comments!</p>}
       </ul>)}
       {currentUser && (
         <section>
           <h2>Add a comment</h2>

           {commentErr && <p>Failed to post - please try again!</p>}
           <form
             onSubmit={(e) => {
               e.preventDefault();
               setUserComment(newUserComment);
               setnewUserComment("");
             }}
           >
             <textarea
               name="comment-box"
               id="commentbox"
               cols="30"
               rows="10"
               value={newUserComment}
               onChange={(e) => {
                 setnewUserComment(e.target.value);
               }}
             ></textarea>
             <button type="submit">Post</button>
           </form>
         </section>
       )}
     </div>
   );
};

export default Comments;