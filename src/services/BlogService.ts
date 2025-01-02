import BlogModel from "../models/blog.model"; // Assuming a BlogModelType exists
import { validate } from "class-validator";
import connection from "../config/mysql";
import { BLOG_STATUS, BLOG_ACCESS_MODE } from "../config/constant";
import { Like } from "typeorm";
import CategoryService from "./CategoryService";

type BlogParams = {
  status?: number;
  id?: number;
  title?: string;
  categoryId?: number;
};

class BlogService {
  static async createBlog(blogData: BlogModel) {
    if (typeof blogData.status !== "number") {
      throw new Error("status不能为空");
    }
    blogData.statusText = BLOG_STATUS.get(blogData.status);
    const blog = new BlogModel(blogData);
    const errors = await validate(blog);
    if (errors.length > 0) {
      throw new Error("验证失败: " + JSON.stringify(errors));
    }
    const result = await connection.getRepository(BlogModel).save(blog);
    if (result.categoryId) {
      await CategoryService.updateBlogCountForCategories(result.categoryId);
    }
    if (!result) {
      throw new Error("创建失败");
    }

    return result;
  }

  static async searchBlogs(params: BlogParams, fromClient: boolean) {
    const { status, id, title, categoryId } = params;
    const where: Partial<BlogParams> = {};
    // C端的搜索参数
    if (fromClient) {
      where.status = 1;
      if (categoryId && !isNaN(Number(categoryId))) {
        if (Number(categoryId) === 1) {
          where.categoryId = undefined;
        } else {
          where.categoryId = Number(categoryId);
        }
      }
    } else {
      if (status && !isNaN(Number(status))) {
        where.status = Number(status);
      }
      if (id && !isNaN(Number(id))) {
        where.id = Number(id);
      }
    }
    if (title) {
      where.title = title;
    }
    return connection.getRepository(BlogModel).find({
      where: {
        id: where.id,
        status: where.status,
        categoryId: where.categoryId,
        title: where.title ? Like(`%${where.title}%`) : undefined,
      },
      order: { createdAt: "DESC" },
    });
  }

  static async getBlogById(id: number, fromClient: boolean) {
    if (!id) {
      throw new Error("id不能为空");
    }
    const con = connection.getRepository(BlogModel);
    const blog = await con.findOne({ where: { id } });
    // 客户端访问博客时，增加浏览量
    if (fromClient) {
      await con.increment({ id }, "views", 1);
    }
    return blog;
  }

  static async updateBlog(id: number, blogData: BlogModel) {
    if (!id) {
      throw new Error("id不能为空");
    }
    console.log(blogData, "blogData");

    await connection.getRepository(BlogModel).update(id, blogData);
    if (blogData.categoryId) {
      await CategoryService.updateBlogCountForCategories(blogData.categoryId);
    }
    const result = await connection.getRepository(BlogModel).findOne({ where: { id } });
    return result;
  }

  static async deleteBlog(id: number) {
    if (!id) {
      throw new Error("id不能为空");
    }
    const blog = await connection.getRepository(BlogModel).findOne({ where: { id }, select: ["id"] });
    await CategoryService.updateBlogCountForCategories(id);
    if (!blog) {
      throw new Error("博客不存在");
    }
    const res = await connection.getRepository(BlogModel).remove(blog);
    return res;
  }
}

export default BlogService;
