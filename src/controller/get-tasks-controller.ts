import { Request, Response } from 'express';

import { prisma } from '../lib/prisma';

export async function getTasksController(request: Request, response: Response) {
    try {
        const userId = request.userId;
        const tasks = await prisma.task.findMany({
            where: { userId, },
            orderBy: { createdAt: 'asc' }
        });
        return response.status(200).json(tasks.map(task => {
            return {
                id: task.id,
                title: task.title,
                finished: task.finished,
                createdAt: task.createdAt,
            };
        }));
    } catch (error) {
        console.error(error);
    }
}
