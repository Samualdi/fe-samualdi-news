import axios from "axios";

const SamualdiNewsAPi = axios.create({
  baseURL: `http://samualdi-news-app.herokuapp.com/api`,
});

export const getArticles = (slug) => {
  return SamualdiNewsAPi.get("/articles", {
    params: {
      topic: slug
    }}).then((res) => {
      return res.data.articles;
   })  
}

export const getTopics = () => {
  return SamualdiNewsAPi.get("/topics").then((res) => {
    return res.data.topics;
  })
}

export const getArticleByID = (article_id) => {
  return SamualdiNewsAPi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  })
}

export const getArticleComments = (article_id) => {
  return SamualdiNewsAPi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.articleComments;
  })
}
