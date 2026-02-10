import http from "./http";

export const getFeaturedNews = async () => {
  const { data } = await http.get("/news_get.php?featured=1");
  return data.data || [];
};

export const getNews = async () => {
  const { data } = await http.get("/news_get.php");
  return data.data || [];
};

export const getNewsOne = async (id) => {
  const { data } = await http.get(`/news_get_one.php?id=${id}`);
  return data.data;
};

export const getComments = async (newsId) => {
  const { data } = await http.get(`/comments_get.php?news_id=${newsId}`);
  return data.data || [];
};

export const addComment = async ({ news_id, user, comment }) => {
  const { data } = await http.post("/comment_add.php", {
    news_id,
    user,
    comment,
  });
  return data;
};
