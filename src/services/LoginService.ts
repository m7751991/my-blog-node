import { validate } from "class-validator";
import { sign } from "../utils/jwt";
import connection from "../config/mysql";
import UserModel, { UserModelType } from "../models/user.model";
import { hashPassword } from "../utils/bcrypt";

class LoginService {
  static async login(params: UserModelType) {
    const { username, password } = params;
    if (!username || !password) {
      throw new Error("用户名或密码不能为空");
    }
    const user = await connection.getRepository(UserModel).findOne({
      where: { username, password: await hashPassword(password) },
    });
    if (user) {
      const token = sign({ id: user?.id, username: user?.username });
      return { user, token };
    }
    return null;
  }

  static async register(params: UserModelType) {
    const { username, password } = params;
    const oneUser = await connection.getRepository(UserModel).findOne({ where: { username } });
    if (oneUser) {
      throw new Error("用户名已存在");
    }
    const hashedPassword = await hashPassword(password);
    const model = new UserModel({ ...params, password: hashedPassword });
    const errors = await validate(model);
    if (errors.length > 0) {
      throw new Error("验证失败: " + JSON.stringify(errors));
    }
    const user = await connection.getRepository(UserModel).save(model);
    return user ?? null;
  }

  // 登出功能通常涉及到无效化用户的会话或令牌
  // 这里我们假设使用一个简单的方式来处理登出
  // 例如，删除用户的令牌或将其标记为无效
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
