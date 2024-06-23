import jwt from "jsonwebtoken";

const VeirfyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  return decoded;
};

export default VeirfyToken;
