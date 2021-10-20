import axios from "axios";

const samualdiNewsAPi = axios.create({
  baseURL: `http://samualdi-news-app.herokuapp.com/api`,
});

export const getArticles = (slug, sortBy, order) => {
  return samualdiNewsAPi.get("/articles", {
    params: {
      topic: slug,
      sort_by: sortBy,
      order: order

    }}).then((res) => {
      return res.data.articles;
   })  
}

export const getTopics = () => {
  return samualdiNewsAPi.get("/topics").then((res) => {
    return res.data.topics;
  })
}

export const getArticleByID = (article_id) => {
  return samualdiNewsAPi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  })
}

export const getArticleComments = (article_id) => {
  return samualdiNewsAPi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.articleComments;
  })
}

export const incArticleVote = (article_id, vote) => {
  return samualdiNewsAPi.patch(`articles/${article_id}`, { inc_votes: vote }).then((res) => {
    return res.data.updatedArticle;
  })
}

export const findUser = (user) => {
    return samualdiNewsAPi.get(`users/${user}`).then((res) => {
    return res.data.user
  })
}

export const postComment = (article_id, currentUser, userComment) => {
  return samualdiNewsAPi.post(`/articles/${article_id}/comments`, {
      username: currentUser.username,
      body: userComment
  }).then((res) => {
      return res.data.newComment
    })
}

export const deleteComment = (commentToDelete) => {
  return samualdiNewsAPi.delete(`/comments/${commentToDelete}`).then((res) => {
    return res;
  })
}


