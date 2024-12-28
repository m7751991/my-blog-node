// Routes
import Router from "koa-router";
import { registerRoutes } from "./routeRegistrar"; // 引入路由注册器

const router = new Router();

// 注册路由
registerRoutes(router);

export default router;
