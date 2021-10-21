import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getArticles } from '../utils/api';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const { slug } = useParams();
    const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');


    useEffect(() => {
        getArticles(slug, sortBy, order).then((articles) => {
            setArticles(articles);
        });
        
    }, [slug, sortBy, order]);
    return (
      <div className="Articles">
        <form>
          <label htmlFor="sort-by">Sort by: </label>
          <select
            name="sort-by"
            id="sort-by"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
          <label htmlFor="order">Order: </label>
          <select
            name="order"
            id="order"
            onChange={(e) => {
              setOrder(e.target.value);
            }}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </form>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id} className="articles-li">
                <Link to={`/articles/${article.article_id}`}>
                  <h3>{article.title}</h3>
                  <p>By: {article.author}</p>
                  <p>Likes: {article.votes}</p>
                  <p>Date: {article.created_at.substring(0,10)}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default Articles;