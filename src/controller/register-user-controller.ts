import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { emailIsValid } from '../util/valid-email';
import { prisma } from '../lib/prisma';
import { createToken } from '../util/token';

export async function registerUserController(request: Request, response: Response) {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                error: 'Os campos são obrigatórios.'
            });
        }
        if (!emailIsValid(email)) {
            return response.status(400).json({
                error: 'E-mail inválido.'
            });
        }
        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        });
        if (userAlreadyExists) {
            return response.status(400).json({
                error: 'E-mail já está sendo utilizado.'
            });
        }
        const passwordHashed = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHashed
            }
        });
        const accessToken = createToken({
            id: user.id,
            email: user.email
        });
        return response.status(201).json({ accessToken });
    } catch (error) {
        console.error(error);
    }
}
