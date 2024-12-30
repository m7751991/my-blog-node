import { sign } from "../utils/jwt";
import connection from "../config/mysql";
import UserModel, { UserModelType } from "../models/user.model";
import { verifyPassword } from "../utils/bcrypt";
import UserService from "./UserService";

class LoginService {
  static async login(params: UserModelType) {
    const { username, password } = params;
    if (!username || !password) {
      throw new Error("用户名或密码不能为空");
    }
    console.log(username, password);

    const { password: userPassword, ...user } = await connection.getRepository(UserModel).findOne({
      where: { username },
    });

    if (await verifyPassword(password, userPassword)) {
      const token = sign({ id: user?.id });
      return { user, token };
    }
    return null;
  }

  //   static async logout(params: UserModelType) {
  //     const { token } = params;
  //     if (!token) {
  //       throw new Error("缺少令牌");
  //     }
  //     // 假设我们有一个 TokenModel 来存储无效化的令牌
  //     const tokenRepository = connection.getRepository(TokenModel);
  //     const existingToken = await tokenRepository.findOne({ where: { token } });

  //     if (existingToken) {
  //         existingToken.isValid = false; // 将令牌标记为无效
  //         await tokenRepository.save(existingToken);
  //     } else {
  //         throw new Error("无效的令牌");
  //     }
  //     // 这里可以添加逻辑来无效化令牌，例如将其存储在数据库中并标记为无效
  //     // 由于没有具体的实现细节，这里仅返回成功消息
  //     return { message: "登出成功" };
  //   }
}

export default LoginService;
