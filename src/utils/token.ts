import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.NEXT_REPORT_TOKEN_SECRET!;

export function decryptToken(token: string): { period: string } | null {
  try {
    const payload = jwt.verify(token, SECRET) as JwtPayload & { period?: string };

    if (typeof payload.period === 'string') return { period: payload.period };
    console.error('Token válido, mas sem claim "period"');
    return null;
  } catch (error) {
    console.error('Token inválido ou expirado:', error);
    return null;
  }
}