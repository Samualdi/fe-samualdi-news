import axios from "axios";

const SamualdiNewsAPi = axios.create({
  baseURL: `http://samualdi-news-app.herokuapp.com/api`,
});

export const getArticles = () => {
    return SamualdiNewsAPi.get("/articles").then((res) => {
      return res.data.articles;
   })  
}
