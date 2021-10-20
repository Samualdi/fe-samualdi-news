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
  console.log(sortBy);


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
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
                <h4>Created by: {article.author}</h4>
                <p>Votes: {article.votes}</p>
                <p>Date: {article.created_at}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default Articles;