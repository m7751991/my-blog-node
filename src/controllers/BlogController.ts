import { Context } from "koa";
import BlogService from "../services/BlogService"; // Assuming a BlogService exists
import { BlogModelType } from "../models/blog.model"; // Assuming a BlogModelType exists
import { HttpStatus } from "../utils/responseHandler";

class BlogController {
  static async createBlog(ctx: Context) {
    try {
      const body = ctx.request.body as BlogModelType;
      const result = await BlogService.createBlog(body);
      if (result) {
        ctx.sendResponse(HttpStatus.OK, { message: "创建成功", data: result });
      } else {
        ctx.sendResponse(HttpStatus.BAD_REQUEST, { message: "创建失败" });
      }
    } catch (error) {
      throw new Error("创建失败: " + error.message);
    }
  }

  static async getAllBlogs(ctx: Context) {
    try {
      const blogs = await BlogService.getAllBlogs();
      ctx.sendResponse(HttpStatus.OK, { message: "获取成功", data: blogs });
    } catch (error) {
      throw new Error("获取失败: " + error.message);
    }
  }

  static async getBlogById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const blog = await BlogService.getBlogById(Number(id));
      if (blog) {
        ctx.sendResponse(HttpStatus.OK, { message: "获取成功", data: blog });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "博客不存在" });
      }
    } catch (error) {
      throw new Error("获取失败: " + error.message);
    }
  }

  static async updateBlogById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body as BlogModelType;
      const result = await BlogService.updateBlog(Number(id), body);
      ctx.sendResponse(HttpStatus.OK, { message: "更新成功", data: result });
    } catch (error) {
      throw new Error("更新失败: " + error.message);
    }
  }

  static async deleteBlogById(ctx: Context) {
    try {
      const { id } = ctx.params;
      const result = await BlogService.deleteBlog(Number(id));
      if (result) {
        ctx.sendResponse(HttpStatus.OK, { message: "删除成功", data: id });
      } else {
        ctx.sendResponse(HttpStatus.NOT_FOUND, { message: "博客不存在" });
      }
    } catch (error) {
      throw new Error("删除失败: " + error.message);
    }
  }
}

export default BlogController;