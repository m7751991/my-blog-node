import Router from "koa-router";
import { API_PREFIX } from "../../config/constant";
import CategoryController from "../../controllers/CategoryController"; // Import UserController

export default function usersRoutes(router: Router) {
  router.post(`${API_PREFIX}/category`, CategoryController.createCategory);

  router.get(`${API_PREFIX}/category`, CategoryController.getAllCategories);

  router.get(`${API_PREFIX}/category/:id`, CategoryController.getCategoryById);

  router.put(`${API_PREFIX}/category/:id`, CategoryController.updateCategoryById);

  router.delete(`${API_PREFIX}/category/:id`, CategoryController.deleteCategoryById);
}
