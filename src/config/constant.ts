export const PORT = 3000;
export const DB_HOST = "localhost";
export const DB_PORT = 3306;
export const DB_USER = "root";
export const DB_PASSWORD = "root";
export const DB_NAME = "test";
export const DB_DIALECT = "mysql";

export const API_PREFIX = "/api/v1";

export const BLOG_STATUS = new Map([
  [0, "草稿"],
  [1, "已发布"],
  [2, "审核中"],
  [3, "已拒绝"],
]);

export const BLOG_ACCESS_MODE = {
  PUBLIC: {
    label: "公开",
    value: 1,
  },
  PRIVATE: {
    label: "私密",
    value: 0,
  },
};
