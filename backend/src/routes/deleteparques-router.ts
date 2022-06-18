import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { deleteParks }  from '@services/deletepark-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { OK } = StatusCodes;




router.delete('/deleteparque/:id',async (req:Request, res:Response) => {
    
    let id = parseInt(req.params.id);

    if (!id) {
        throw new ParamMissingError();
    }
    console.log(req);
    

    const deleteParque = await deleteParks (id);
    return res.status(OK).json(deleteParque);
    
});


export default router;