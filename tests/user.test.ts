import request from "supertest";
// import app from "../testApp";
import app from "../src/index";

// describe("GET /api/users", () => {
//   it("应该返回用户列表", async () => {
//     const response = await request(app.callback()).get("/api/users");

//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array); // 确保返回的是数组
//     // 你可以添加更多的断言来验证返回的数据结构
//   });
// });

describe("POST /api/v1/users", () => {
  it("应该创建新用户", async () => {
    const response = await request(app.callback()).post("/api/v1/users").send({
      username: "test",
      password: "123456",
      email: "test@test.com",
      isAdmin: false,
    });
    console.log(response.body, "response.body");

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("创建新用户成功");
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.password).toBe("123456");
    expect(response.body.data.email).toBe("test@test.com");
    expect(response.body.data.isAdmin).toBe(false);
  });
});
