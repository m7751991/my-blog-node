import { Context } from "koa";
import CategoryService from "../services/CategoryService";
import { CategoryModelType } from "../models/category.model";
import { HttpStatus } from "../utils/responseHandler";

class CategoryController {
  static async createCategory(ctx: Context) {
    try {
      const body = ctx.request.body as CategoryModelType;
      const result = await CategoryService.createCategory(body);
      if (result) {
        ctx.sendResponse(HttpStatus.OK, { message: "分类创建成功", data: result });
      } else {
        ctx.sendResponse(HttpStatus.BAD_REQUEST, { message: "分类创建失败" });
      }
    } catch (error) {
      throw new Error("分类创建失败: " + error.message);
    }
  }

  static async getAllCategories(ctx: Context) {
    try {
      const categories = await CategoryService.getAllCategories();
      ctx.sendResponse(HttpStatus.OK, { message: "获取分类成功", data: categories });
    } catch (error) {
      throw new Error("获取分类失败: " + error.message);
    }
  }

  static async getCategoryById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const category = await CategoryService.getCategoryById(Number(id));
      if (category) {
        ctx.sendResponse(HttpStatus.OK, { message: "获取分类成功", data: category });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "分类不存在" });
      }
    } catch (error) {
      throw new Error("获取分类失败: " + error.message);
    }
  }

  static async updateCategoryById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body as CategoryModelType;
      const result = await CategoryService.updateCategory(Number(id), body);
      ctx.sendResponse(HttpStatus.OK, { message: "分类更新成功", data: result });
    } catch (error) {
      throw new Error("分类更新失败: " + error.message);
    }
  }

  static async deleteCategoryById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const result = await CategoryService.deleteCategory(Number(id));
      if (result) {
        ctx.sendResponse(HttpStatus.OK, { message: "分类删除成功", data: id });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "分类不存在" });
      }
    } catch (error) {
      throw new Error("分类删除失败: " + error.message);
    }
  }
}

export default CategoryController;
