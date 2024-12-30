import BlogModel from "../models/blog.model"; // Assuming a BlogModelType exists
import { validate } from "class-validator";
import connection from "../config/mysql";

class BlogService {
  static async createBlog(blogData: BlogModel) {
    const blog = new BlogModel(blogData);
    const errors = await validate(blog);
    if (errors.length > 0) {
      throw new Error("验证失败: " + JSON.stringify(errors));
    }
    const result = await connection.getRepository(BlogModel).save(blog);
    if (!result) {
      throw new Error("创建失败");
    }

    return result;
  }

  static async getAllBlogs() {
    return await connection.getRepository(BlogModel).find({ order: { createdAt: "DESC" } });
  }

  static async getBlogById(id: number) {
    if (!id) {
      throw new Error("id不能为空");
    }
    return await connection.getRepository(BlogModel).findOne({ where: { id } });
  }

  static async updateBlog(id: number, blogData: BlogModel) {
    if (!id) {
      throw new Error("id不能为空");
    }
    const blog = await connection.getRepository(BlogModel).findOne({ where: { id } });
    if (!blog) {
      throw new Error("博客不存在");
    }
    Object.assign(blog, blogData);
    const errors = await validate(blog);
    if (errors.length > 0) {
      throw new Error("验证失败: " + JSON.stringify(errors));
    }
    return await connection.getRepository(BlogModel).save(blog);
  }

  static async deleteBlog(id: number) {
    if (!id) {
      throw new Error("id不能为空");
    }
    const blog = await connection.getRepository(BlogModel).findOne({ where: { id } });
    if (!blog) {
      throw new Error("博客不存在");
    }
    await connection.getRepository(BlogModel).remove(blog);
    return true;
  }
}

export default BlogService;
