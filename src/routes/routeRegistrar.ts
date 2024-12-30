import Router from "koa-router";
import loginRoutes from "./login";
import usersRoutes from "./users";
import blogRoutes from "./blog";
import categoryRoutes from "./category";

export function registerRoutes(router: Router) {
  loginRoutes(router);
  usersRoutes(router);
  blogRoutes(router);
  categoryRoutes(router);
}
