import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes'
import { ParamMissingError } from '@shared/errors';
import { editFlora } from '@services/editflora-service';

const router = Router();
const { OK } = StatusCodes;

router.put('/editFlora/:id', async (req:Request, res:Response) => {

    const flora  = req.body ?? {}; 

    if(!flora.id) {
        throw new ParamMissingError();
    }

    const updateFlora = await editFlora(flora);
    return res.status(OK).json(updateFlora);
    
})

export default router;