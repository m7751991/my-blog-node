import { validate } from "class-validator";
import connection from "../config/mysql";
import { hashPassword } from "../utils/bcrypt";
import UserModel, { UserModelType } from "../models/user.model";

class UserService {
  static async createUser(user: UserModelType) {
    const { username, password } = user;
    const oneUser = await connection.getRepository(UserModel).findOne({ where: { username } });
    if (oneUser) {
      throw new Error("用户名已存在");
    }
    const hashedPassword = await hashPassword(password);
    const model = new UserModel({ ...user, password: hashedPassword });
    const errors = await validate(model);
    if (errors.length > 0) {
      throw new Error("验证失败: " + JSON.stringify(errors));
    }
    const result = await connection.getRepository(UserModel).save(model);
    const { password: pw, ...rest } = result;
    return rest ?? null;
  }

  static async getAllUsers() {
    return await connection.getRepository(UserModel).find();
  }

  static async getUserById(id: number) {
    return await connection.getRepository(UserModel).findOne({ where: { id } });
  }

  static async updateUser(id: number, body: UserModelType) {
    const user = (await connection.getRepository(UserModel).findOne({ where: { id } })) as UserModelType;
    if (user) {
      Object.assign(user, body);
      const updatedUser = await connection.getRepository(UserModel).save(user);
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  }

  static async deleteUser(id: number) {
    const result = await connection.getRepository(UserModel).delete({ id: Number(id) }); // Changed from Link to User
    console.log(result, "result");

    return result.affected;
  }
}

export default UserService;
