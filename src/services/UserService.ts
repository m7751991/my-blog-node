import connection from "../config/mysql";
import UserModel, { UserModelType } from "../models/user.model";

class UserService {
  static async createUser(user: UserModelType) {
    const newUser = new UserModel(user);
    const response = await connection.getRepository(UserModel).save(newUser);
    console.log(response, "response");

    return response;
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
