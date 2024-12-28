import request from "supertest";
import app from "../src/index"; // 引入你的 Koa 应用
import { initializeDatabase, closeDatabaseConnection } from "../src/config/mysql"; // 引入关闭连接的函数
import { UserModelType } from "../src/models/user.model";

describe("Koa Application", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });
  it("创建用户", async () => {
    const response = await request(app.callback())
      .post("/api/v1/users")
      .send({
        username: "test",
        password: "123456",
        email: "test@test.com",
        isAdmin: true,
      } as UserModelType);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.email).toBe("test@test.com");
    expect(response.body.data.isAdmin).toBe(true);
    expect(response.status).toBe(200);
  });

  it("修改用户", async () => {
    const response = await request(app.callback())
      .put("/api/v1/users/7")
      .send({
        username: "updatetest",
        password: "123456",
        email: "updatetest@test.com",
        isAdmin: false,
      } as UserModelType);
    expect(response.body.data.username).toBe("updatetest");
    expect(response.body.data.email).toBe("updatetest@test.com");
    expect(response.body.data.isAdmin).toBe(false);
    expect(response.status).toBe(200);
  });

  it("获取用户列表", async () => {
    const response = await request(app.callback()).get("/api/v1/users");
    expect(response.body.data).toBe(Array);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await closeDatabaseConnection();
  });

  // 你可以添加更多的测试用例来测试其他路由和中间件
});
