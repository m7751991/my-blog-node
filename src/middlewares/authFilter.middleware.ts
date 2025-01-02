import { Context, Next } from "koa";
import { verify } from "../utils/jwt";

const authFilter = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers.authorization;
  const pathList = ["/api/v1/login", "/api/v1/users", "/api/v1/blogs/search", "/api/v1/category"];
  const isDynamicRoute = ctx.request.path.match(/\/api\/v1\/blogs\/\d+/);

  const error = {
    message: "无效的令牌",
    status: 401,
    code: 10001,
  };
  // 如果是登录或公共路径，直接放行
  if (pathList.includes(ctx.request.path) || isDynamicRoute) {
    await next();
    return;
  }
  // 如果没有 token，抛出未登录错误
  if (!token) {
    console.log(ctx.request.path, "未登录");
    throw {
      message: "未登录",
      status: 401,
      code: 10001,
    };
  }

  let decoded = null;
  try {
    decoded = verify(token, ctx); // 校验 token
    if (!decoded) {
      throw error;
    }
  } catch (c) {
    throw error;
  }

  // 如果 token 校验通过，继续执行下一个中间件
  await next();
};

export default authFilter;
