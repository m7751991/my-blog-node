import Router from "koa-router";
import BlogController from "../../controllers/BlogController";
import { API_PREFIX } from "../../config/constant";

const blogRoute = new Router();

blogRoute.post(`${API_PREFIX}/blogs`, BlogController.createBlog);
blogRoute.get(`${API_PREFIX}/blogs`, BlogController.getAllBlogs);
blogRoute.get(`${API_PREFIX}/blogs/:id`, BlogController.getBlogById);
blogRoute.put(`${API_PREFIX}/blogs/:id`, BlogController.updateBlogById);
blogRoute.delete(`${API_PREFIX}/blogs/:id`, BlogController.deleteBlogById);

export default blogRoute;
