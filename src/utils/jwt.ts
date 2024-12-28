import jwt from "jsonwebtoken";
const SECRET_KEY = "1234567890";

export const sign = (payload: any) => {
  return jwt.sign({ ...payload, time: new Date().getTime() }, SECRET_KEY, { expiresIn: "1h" });
};

export const verify = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
