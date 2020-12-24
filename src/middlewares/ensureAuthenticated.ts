import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';
import AppError from '../app/application/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function expressAuthentication(
  request: Request,
  _securityName: string,
  _scopes?: string[]
): Promise<any> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    return Promise.resolve({ id: sub });
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
