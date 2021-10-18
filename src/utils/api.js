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
