import StatusCodes, { CREATED } from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { deleteHorarios }  from '@services/deletehorario-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { OK } = StatusCodes;


router.delete('/deletehorario/:id',async (req:Request, res:Response) => {
    
    //console.log("REQ: ",req);
    let id = parseInt(req.params.id);
    

    if (!id) {
        throw new ParamMissingError();
    }
    
    

    const deletehorario = await deleteHorarios (id);
    return res.status(OK).json(deletehorario);
    
});


export default router;