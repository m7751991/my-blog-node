import { Context, Next } from "koa";

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next(); // 执行后续中间件
  } catch (err) {
    console.error(err);
    ctx.status = 500; // 设置响应状态码
    ctx.body = {
      status: err.status,
      code: err.code,
      message: err.message,
    };
  }
};

export default errorHandler;
