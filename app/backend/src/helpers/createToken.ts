import 'dotenv/config';
import { sign, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default (email: string) => {
  const jwtConfig: SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
  const token = sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};