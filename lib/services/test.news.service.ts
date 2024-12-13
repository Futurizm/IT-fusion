import { createNews, getAllNews } from "./news.service";

await createNews("test", "test", new Date(), "./aidar/image.png")

const news = await getAllNews()

console.log(news)