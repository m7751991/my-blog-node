import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx: Koa.Context) => {
  ctx.body = "Hello World";
});

app.use(router.routes());
const port = process.env.PORT || 3002;
const server = app.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);

export default app;
