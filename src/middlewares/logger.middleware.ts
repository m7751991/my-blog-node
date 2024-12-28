// Logger Middleware
import { Context, Next } from 'koa';

const logger = async (ctx: Context, next: Next) => {
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
};

export default logger;
