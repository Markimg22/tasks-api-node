import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { emailIsValid } from '../util/valid-email';
import { prisma } from '../lib/prisma';
import { createToken } from '../util/token';

export async function loginUserController(request: Request, response: Response) {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({
                error: 'Os campos são obrigatórios.'
            });
        }
        if (!emailIsValid(email)) {
            return response.status(400).json({
                error: 'E-mail inválido.'
            });
        }
        const userExists = await prisma.user.findFirst({
            where: { email }
        });
        if (!userExists) {
            return response.status(400).json({
                error: 'Usuário não cadastrado.'
            });
        }
        const passwordIsCorrect = await bcrypt.compare(password, userExists.password);
        if (!passwordIsCorrect) {
            return response.status(400).json({
                error: 'Senha incorreta.'
            });
        }
        const accessToken = createToken({
            id: userExists.id,
            email: userExists.email
        });
        return response.status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
    }
}
