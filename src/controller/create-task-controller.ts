import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export async function createTaskController(request: Request, response: Response) {
    try {
        const userId = request.userId;
        const { title } = request.body;
        if (!title) {
            return response.status(400).json({
                error: 'Os campos são obrigatórios.'
            });
        }
        const task = await prisma.task.create({
            data: { title, userId }
        });
        return response.status(201).json({
            message: `Tarefa '${task.title}' criada com sucesso.`
        });
    } catch (error) {
        console.error(error);
    }
}
