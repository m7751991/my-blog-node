import zlib from "zlib";
import jwt from "jsonwebtoken";
const SECRET_KEY = "short";

export const sign = (payload: any) => {
  const jsonPayload = JSON.stringify(payload);
  const compressedPayload = zlib.gzipSync(jsonPayload).toString("base64");
  const token = jwt.sign({ data: compressedPayload }, SECRET_KEY, { expiresIn: "1h", algorithm: "HS256" });
  console.log(token, "token");

  return token;
};

export const verify = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
