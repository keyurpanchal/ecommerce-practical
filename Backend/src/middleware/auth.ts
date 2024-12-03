import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../interfaces/authenticatedRequest";
import { Constants } from "../constants/constants";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Access Denied",
      error: "No token provided",
    });
    return;;
  }

  jwt.verify(token as string, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
        res.status(403).json({
            success: false,
            message: 'Invalid Token',
            error: err.message,
          });
        return;
    }
    req.user = user;
    next();
  });
};

export const authorize = (role: string) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized',
          error: 'User not authenticated',
        });
        return;
    }
    
    if (req.user.role !== role) {
        res.status(403).json({
          success: false,
          message: 'Access Denied',
          error: `User role '${req.user.role}' is not authorized for this action`,
        });
        return;
    }
    
    next();
  };
