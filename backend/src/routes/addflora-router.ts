import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { postFlora } from '@services/addflora-service';
import { prisma } from '@prisma/client';

// Constants
const router = Router();
const { OK } = StatusCodes;

router.post('/addflora', async (req: Request, res: Response) => {
    console.log('Flora: ', req.body);
    const { flora } = req.body ?? {};
    console.log('NEXT: ', flora);

    const floras = await postFlora(flora);
    res.status(OK).json(floras);


});






export default router;