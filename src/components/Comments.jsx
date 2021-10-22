import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/User';
import { deleteComment, getArticleComments, postComment } from '../utils/api';
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
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentDeleting, setCommentDeleting] = useState(false);
  const [deleteErr, setdeleteErr] = useState();

    useEffect(() => {
      setErr(null);
      getArticleComments(article_id)
        .then((comments) => {
          setComments(comments);
        })
        .catch(() => {
          setErr("Something went wrong!");
        });
    }, [article_id, comments]);

    useEffect(() => {
      if (userComment) {
        setCommentErr(null);
        setCommentLoading(true);
        postComment(article_id, currentUser, userComment)
          .then(() => {
            setCommentLoading(false);
          })
          .catch(() => {
            setCommentErr("Post failed, please try again.");
            setCommentLoading(false);
          });
      }
    }, [userComment, article_id, currentUser]);

    useEffect(() => {
      if (commentToDelete) {
        setCommentDeleting(true);
        deleteComment(commentToDelete)
          .then(() => {
            setCommentToDelete();
            setCommentDeleting(false);
          })
          .catch(() => {
            setdeleteErr("Failed to delete. Please try again");
            setCommentDeleting(false);
          });
      }
    }, [commentToDelete]);

  
    
  if (err) return <p>{err}</p>
  
  return (
    <section className="comments-section">
      <section>
        <h2>Comments</h2>
        <label>
          <Toggle
            defaultChecked={showComments === true}
            className="comments-toggle"
            onChange={() => {
              setShowComments(!showComments);
            }}
          />
        </label>
      </section>
      {showComments && (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>By: {comment.author}</p>
                <p>Date: {comment.created_at}</p>
                {commentDeleting && <p>Deleting...</p>}
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
                {deleteErr && <p>{deleteErr}</p>}
              </li>
            );
          })}
          {err && <p>Something went wrong with loading comments!</p>}
        </ul>
      )}
      {currentUser && (
        <section>
          <h2>Add a comment</h2>

          {commentErr && <p>Failed to post - please try again!</p>}
          {commentLoading && <p>Loading...</p>}
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
              placeholder="Tell us what you think..."
              cols="30"
              rows="10"
              value={newUserComment}
              onChange={(e) => {
                setnewUserComment(e.target.value);
              }}
            ></textarea>
            <br />
            <button type="submit">Post</button>
          </form>
        </section>
      )}
    </section>
  );
};

export default Comments;