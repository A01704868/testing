import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { deleteCarts }  from '@services/deletecardrouter-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { OK } = StatusCodes;

router.delete('/deletecartaruta/:id',async (req:Request, res:Response) => {
    
    console.log("REQ: ",req);
    let id = parseInt(req.body.id);

    if (!id) {
        throw new ParamMissingError();
    }
    
    

    const deletecartaruta = await deleteCarts (id);
    return res.status(OK).json(deletecartaruta);
    
});


export default router;