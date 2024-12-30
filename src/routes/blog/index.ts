import Router from "koa-router";
import BlogController from "../../controllers/BlogController";
import { API_PREFIX } from "../../config/constant";

export default (router: Router) => {
  router.post(`${API_PREFIX}/blogs`, BlogController.createBlog);
  router.get(`${API_PREFIX}/blogs`, BlogController.getAllBlogs);
  router.get(`${API_PREFIX}/blogs/:id`, BlogController.getBlogById);
  router.put(`${API_PREFIX}/blogs/:id`, BlogController.updateBlogById);
  router.delete(`${API_PREFIX}/blogs/:id`, BlogController.deleteBlogById);
};
