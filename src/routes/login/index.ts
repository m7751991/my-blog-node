import Router from "koa-router";
import { API_PREFIX } from "../../config/constant";
import LoginController from "../../controllers/LoginController"; // Import UserController

export default function loginRoutes(router: Router) {
  // Get all users
  router.post(`${API_PREFIX}/login`, LoginController.login);
}
