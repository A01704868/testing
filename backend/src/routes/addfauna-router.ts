import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { postFauna } from '@services/addfauna-service';
import { prisma } from '@prisma/client';

// Constants
const router = Router();
const { OK } = StatusCodes;

router.post('/addfauna', async (req: Request, res: Response) => {
    console.log('Fauna: ', req.body);
    const { fauna } = req.body ?? {};
    console.log('NEXT: ', fauna);

    const faunas = await postFauna(fauna);
    res.status(OK).json(faunas);


});






export default router;