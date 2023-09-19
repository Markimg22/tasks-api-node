import jwt from 'jsonwebtoken';

type CreateTokenParams = {
    id: string;
    email: string;
}

export function createToken({ id, email }: CreateTokenParams): string {
    const token = jwt.sign(
        { id, email },
        String(process.env.TOKEN_SECRET),
        { expiresIn: String(process.env.TOKEN_EXPIRES_IN) }
    );
    return token;
}

export function decodeToken(token: string) {
    const data = jwt.verify(token, String(process.env.TOKEN_SECRET));
    return data;
}
