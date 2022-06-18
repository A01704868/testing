import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes'
import { ParamMissingError } from '@shared/errors';
import { editFauna } from '@services/editfauna-service';

const router = Router();
const { OK } = StatusCodes;

router.put('/editFauna/:id', async (req:Request, res:Response) => {

    //let parque = req.body;

    const fauna  = req.body ?? {};
   
    if(!fauna.id) {
        throw new ParamMissingError();
    }
    console.log(fauna);


    const updateFauna = await editFauna(fauna);
    return res.status(OK).json(updateFauna)
    
})

export default router;

