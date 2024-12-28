import Router from "koa-router";
import { API_PREFIX } from "../../config/constant";
import UserController from "../../controllers/UserController"; // Import UserController

export default function usersRoutes(router: Router) {
  // Create a new user
  router.post(`${API_PREFIX}/users`, UserController.createUser);

  // Get all users
  router.get(`${API_PREFIX}/users`, UserController.getAllUsers);

  // Get a user by ID
  router.get(`${API_PREFIX}/users/:id`, UserController.getUserById);

  // Update a user by ID
  router.put(`${API_PREFIX}/users/:id`, UserController.updateUserById);

  // Delete a user by ID
  router.delete(`${API_PREFIX}/users/:id`, UserController.deleteUserById);
}
