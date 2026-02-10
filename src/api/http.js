import axios from "axios";

const http = axios.create({
  baseURL: "https://panel.gokhankozak.com/api",
  headers: { "Content-Type": "application/json" },
});

export default http;
