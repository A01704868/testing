import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';
import { postCarts } from '@services/addcardrouter-service';
import { prisma } from '@prisma/client';

// Constants
const router = Router();
const { OK } = StatusCodes;

router.post('/addcartaruta',async (req:Request, res: Response) => {
    console.log('VALOR:',req.body);
    const { cartaruta } = req.body ?? {};
    console.log('NEXT:',cartaruta);
    
    const cartarutas = await postCarts(cartaruta);
    res.status(OK).json(cartarutas);
    
});

export default router;