import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type Decoded = {
    id: string;
    email: string
}

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.headers.authorization;
        if (!token) {
            return response.status(4001).json({
                error: 'Token de autenticação não fornecido.'
            });
        }
        const accessToken = token.split(' ')[1];
        const decoded = jwt.verify(accessToken, String(process.env.TOKEN_SECRET)) as Decoded;
        request.userId = decoded.id;
        request.userEmail = decoded.email;
        next();
    } catch (error) {
        console.error(error);
        return response.status(401).json({
            error: 'Usuário não autorizado.'
        });
    }
}
