// Entry Point
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors"; // 引入 CORS 中间件
import routes from "./routes/index";
import logger from "./middlewares/logger.middleware";
import ip from "ip";
import { sendResponse } from "./utils/responseHandler";
import errorHandler from "./middlewares/errorHandler.middlewar";
const app = new Koa();
import "./config/mysql";

// Use middlewares
app.use(cors());
app.use(bodyParser());
app.use(logger);
app.use(errorHandler);
app.use(async (ctx, next) => {
  ctx.sendResponse = (status: number, data: any) => sendResponse(ctx, status, data);
  await next();
});

// Register routes
app.use(routes.routes()).use(routes.allowedMethods());

// Start ser
const getPort = () => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  return port >= 3000 && port <= 4000 ? port : 3000; // Ensure the port is within a valid range
};

const PORT = getPort();
app.listen(PORT, () => {
  console.log(`Server IP address: ${ip.address()}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
