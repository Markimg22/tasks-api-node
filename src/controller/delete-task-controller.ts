import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export async function deleteTaskController(request: Request, response: Response) {
    try {
        const userId = request.userId;
        const { taskId } = request.params;
        if (!taskId) {
            return response.status(400).json({
                error: 'Os campos são obrigatórios.'
            });
        }
        const task = await prisma.task.delete({
            where: {
                id: taskId,
                userId,
            },
        });
        return response.status(200).json({
            message: `Tarefa '${task.title}' removida com sucesso.`
        });
    } catch (error) {
        console.error(error);
    }
}
