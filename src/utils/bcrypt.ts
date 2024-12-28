import bcrypt from "bcrypt";

const saltRounds = 10; // 盐的轮数

// 哈希密码
export async function hashPassword(plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// 验证密码
export async function verifyPassword(plainPassword: string, hash: string) {
  const match = await bcrypt.compare(plainPassword, hash);
  return match; // 返回 true 或 false
}
