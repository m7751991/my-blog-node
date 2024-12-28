import { Context } from "koa";
import LoginService from "../services/LoginService";
import { UserModelType } from "../models/user.model";
import { HttpStatus } from "../utils/responseHandler";

class LoginController {
  static async login(ctx: Context) {
    try {
      const body = ctx.request.body as UserModelType;
      const user = await LoginService.login(body);
      if (user) {
        ctx.sendResponse(HttpStatus.OK, { message: "登录成功", data: user });
      } else {
        ctx.sendResponse(HttpStatus.BAD_REQUEST, { message: "登录失败,用户名或密码错误" });
      }
    } catch (error) {
      throw new Error("登录失败" + error.message);
    }
  }

  // static async logout(ctx: Context) {
  //   const { token } = ctx.request.body;
  // }

  // static async refreshToken(ctx: Context) {
  //   const { token } = ctx.request.body;
  // }
}

export default LoginController;
