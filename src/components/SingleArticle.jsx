import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticleByID } from '../utils/api';
import Comments from './Comments';

const SingleArticle = () => {
    const [article, setArticle] = useState({})
    const [err, setErr] = useState(null)
    const { article_id } = useParams();

    useEffect(() => {
        getArticleByID(article_id).then((article) => {
            setErr(null)
            setArticle(article);
        }).catch((err) => {
            setErr(err.response.data.msg);
        })

        
    }, [article_id]);

    if (err) return <p>{err}</p>
    return (
        <div>
            <h2>{article.title}</h2>
            <p>By: {article.author}</p>
            <p>{article.body}</p>
            <p>Date: {article.created_at}</p>
            <h2>Votes: {article.votes}</h2>
            <Comments article_id={article_id}/>
        </div>
    );
};

export default SingleArticle;