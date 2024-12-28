import { Context, Next } from "koa";
import { verify } from "../utils/jwt";

const authFilter = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers.authorization;
  console.log(token, "token");

  if (!token) {
    ctx.sendResponse(401, { message: "未登录" });
    return;
  }

  try {
    const decoded = verify(token);
    if (decoded) {
      await next();
    } else {
      ctx.sendResponse(401, { message: "无效的令牌" });
    }
  } catch (err) {
    ctx.sendResponse(401, { message: "无效的令牌" });
  }
};

export default authFilter;
