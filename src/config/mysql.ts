import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import { readdirSync } from "fs";

const modelsPath = join(__dirname, "../models");
const modelFiles = readdirSync(modelsPath).filter((file) => file.endsWith(".ts"));
const entities = modelFiles.map((file) => require(join(modelsPath, file)).default);

console.log(entities, "entities");

const ormconfig: DataSourceOptions = {
  type: "mysql",
  host: "sh-cynosdbmysql-grp-jua9wveg.sql.tencentcdb.com",
  port: 23932,
  username: "root",
  password: "Mm506045318",
  database: "blog",
  synchronize: true,
  logging: false,
  entities: [...entities],
};

const connection = new DataSource(ormconfig);
// 添加关闭连接的函数
export const closeDatabaseConnection = async () => {
  await connection.destroy(); // 关闭连接
  console.log("数据库连接已关闭");
};

// 初始化数据库连接
export const initializeDatabase = async () => {
  try {
    console.log("开始链接数据库");
    await connection.initialize();
    console.log("数据库连接成功");
  } catch (error) {
    console.log("数据库连接失败", error);
    process.exit(1);
  }
};

export default connection;
