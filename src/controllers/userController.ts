import { Context } from "koa";
import UserService from "../services/UserService";
import { UserModelType } from "../models/user.model";
import { HttpStatus } from "../utils/responseHandler";

class UserController {
  static async createUser(ctx: Context) {
    try {
      const body = ctx.request.body as UserModelType;
      console.log(body, "body");

      const user = await UserService.createUser(body);
      ctx.sendResponse(HttpStatus.CREATED, { message: "创建新用户成功", data: user });
    } catch (error) {
      throw new Error("创建新用户失败" + error.message);
    }
  }

  static async getAllUsers(ctx: Context) {
    try {
      const users = await UserService.getAllUsers();
      ctx.sendResponse(HttpStatus.OK, { message: "获取所有用户成功", data: users });
    } catch (error) {
      throw new Error("获取所有用户失败" + error.message);
    }
  }

  static async getUserById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const user = await UserService.getUserById(Number(id));
      if (user) {
        ctx.sendResponse(HttpStatus.OK, { message: "获取用户成功", data: user });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "用户不存在" });
      }
    } catch (error) {
      throw new Error("获取用户失败" + error.message);
    }
  }

  static async updateUserById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body as UserModelType;
      const result = await UserService.updateUser(Number(id), body);
      ctx.sendResponse(HttpStatus.OK, { message: "更新用户成功", data: result });
    } catch (error) {
      throw new Error("更新用户失败" + error.message);
    }
  }

  static async deleteUserById(ctx: Context) {
    try {
      const { id } = ctx.params;
      console.log(id, "id");

      const result = await UserService.deleteUser(Number(id));
      if (result) {
        console.log(result, "result");

        ctx.sendResponse(HttpStatus.OK, { message: "删除用户成功", data: id });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "用户不存在" });
      }
    } catch (error) {
      throw new Error("删除用户失败" + error.message);
    }
  }
}

export default UserController;
