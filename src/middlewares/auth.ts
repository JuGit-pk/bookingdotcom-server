import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// adding this type as the global so our application will get this field
// remember that its not the extended interface whice is a new interface wxteended version,
// its existing global field
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"]; // this is available after the cookie-parser middleware
  if (!token) {
    res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "unauthorized" });
  }
};
export default verifyToken;
