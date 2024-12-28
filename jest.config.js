// jest.config.js
export default {
  preset: "ts-jest", // 使用 ts-jest 处理 TypeScript
  testEnvironment: "node", // 或 'jsdom'，根据您的需求
  transform: {
    "^.+\\.tsx?$": "ts-jest", // 处理 .ts 和 .tsx 文件
  },
  extensionsToTreatAsEsm: [".ts"], // 将 .ts 文件视为 ESM
  transformIgnorePatterns: ["/node_modules/"], // 忽略 node_modules
};
