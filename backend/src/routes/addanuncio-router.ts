import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';
import {  postAnuncio } from '@services/addanuncio-service';

// Constants
const router = Router();
const { OK } = StatusCodes;

router.post('/addanuncio',async (req:Request, res: Response) => {
    const {  anuncio } = req.body ?? {};
    
    const anuncios = await postAnuncio(anuncio);
    res.status(OK).json(anuncios);
    
});

export default router;