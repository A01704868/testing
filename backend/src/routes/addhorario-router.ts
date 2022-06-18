import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { postHorario } from '@services/addhorario-service';
import { prisma } from '@prisma/client';

// Constants
const router = Router();
const { OK } = StatusCodes;

router.post('/addhorario',async (req:Request, res: Response) => {
    console.log('VALOR:',req.body);
    const { horario } = req.body ?? {};
    console.log('NEXT:',horario);
    
    const horarios = await postHorario(horario);
    res.status(OK).json(horarios);
    
});

export default router;