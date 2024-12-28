import Router from "koa-router";
import loginRoutes from "./login";
import usersRoutes from "./users";

export function registerRoutes(router: Router) {
  loginRoutes(router);
  usersRoutes(router);
}
