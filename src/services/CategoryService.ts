import CategoryModel from "../models/category.model";
import connection from "../config/mysql";
import { CategorySearchDataType } from "../types";
import { Like } from "typeorm";
import BlogModel from "../models/blog.model";

export default class CategoryService {
  static async createCategory(category: CategoryModel) {
    const result = await connection.getRepository(CategoryModel).save(category);
    return result;
  }

  static async getAllCategories(searchData: CategorySearchDataType) {
    const categoryRepository = connection.getRepository(CategoryModel);
    const categories = await categoryRepository.find({
      where: {
        name: searchData.name ? Like(`%${searchData.name}%`) : undefined,
        id: searchData.id ? searchData.id : undefined,
      },
      order: { createdAt: "DESC" },
    });
    return categories;
  }
  static async getCategoryById(id: number) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).findOne({ where: { id } });
    return result;
  }

  static async updateCategory(id: number, category: CategoryModel) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).update(id, category);
    return result;
  }

  // 当创建博客时，更新博客时候，更新类别关联的博客数量
  static async updateBlogCountForCategories(id: number) {
    const categoryRepository = connection.getRepository(CategoryModel);
    const categorie = await categoryRepository.findOneBy({ id });
    if (!categorie) {
      throw new Error("categoryId不存在");
    }
    const nums = await connection.getRepository(BlogModel).countBy({
      categoryId: categorie.id,
    });
    // 更新类别的博客数量
    const result = await categoryRepository.update(categorie.id, { blogCount: nums });
    return result;
  }

  static async deleteCategory(id: number) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).delete(id);
    await connection.getRepository(BlogModel).update({ categoryId: id }, { categoryId: null, categoryName: null });
    return result.affected > 0;
  }
}
