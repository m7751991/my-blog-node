import { Context, Next } from "koa";

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next(); // 执行后续中间件
  } catch (err) {
    console.error(err); // 记录错误信息
    ctx.status = err.status || 500; // 设置响应状态码
    ctx.body = {
      message: "服务器内部错误",
      error: err.message,
    };
  }
};

export default errorHandler;
