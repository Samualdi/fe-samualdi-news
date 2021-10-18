import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getArticles } from '../utils/api';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const { slug } = useParams();


    useEffect(() => {
        getArticles(slug).then((articles) => {
            setArticles(articles);
        });
        
    }, [slug]);
    return (
        <div className="Articles">
            <ul>
                {articles.map(article => {
                   return  <li key={article.article_id}>
                       <h3>{article.title}</h3>
                       <h4>Created by: {article.author}</h4>
                       <p>Votes: {article.votes}</p>
                       <p>Date: {article.created_at}</p>
                    </li>
                    
                })}
          </ul>
        </div>
    );
};

export default Articles;