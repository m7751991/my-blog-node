import CategoryModel from "../models/category.model";
import connection from "../config/mysql";
import { CategorySearchDataType } from "../types";
import { Like } from "typeorm";

export default class CategoryService {
  static async createCategory(category: CategoryModel) {
    const result = await connection.getRepository(CategoryModel).save(category);
    return result;
  }

  static async getAllCategories(searchData: CategorySearchDataType) {
    const result = await connection.getRepository(CategoryModel).find({
      where: {
        name: searchData.name ? Like(`%${searchData.name}%`) : undefined,
        id: searchData.id ? searchData.id : undefined,
      },
      order: { createdAt: "DESC" },
    });
    return result;
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
  static async deleteCategory(id: number) {
    if (!id) {
      throw new Error("id不存在");
    }
    const result = await connection.getRepository(CategoryModel).delete(id);
    return result.affected > 0;
  }
}
