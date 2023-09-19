import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export async function updateTaskController(request: Request, response: Response) {
    try {
        const userId = request.userId;
        const { taskId } = request.params;
        const { finished } = request.body;
        if (!taskId) {
            return response.status(400).json({
                error: 'Os campos são obrigatórios.'
            });
        }
        const task = await prisma.task.update({
            where: {
                id: taskId,
                userId,
            },
            data: { finished }
        });
        return response.status(200).json({
            message: `Tarefa '${task.title}' atualizada com sucesso.`
        });
    } catch (error) {
        console.error(error);
    }
}
