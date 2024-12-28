import { CategoryModelType } from "../models/category.model";
import CategoryModel from "../models/category.model";
import connection from "../config/mysql";

export default class CategoryService {
  static async createCategory(category: CategoryModelType) {
    const result = await connection.getRepository(CategoryModel).save(category);
    return result;
  }

  static async getAllCategories() {
    const result = await connection.getRepository(CategoryModel).find({ order: { createdAt: "DESC" } });
    return result;
  }
  static async getCategoryById(id: number) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).findOne({ where: { id } });
    return result;
  }

  static async updateCategory(id: number, category: CategoryModelType) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).update(id, category);
    return result;
  }
  static async deleteCategory(id: number) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).delete(id);
    return result.affected > 0;
  }
}
