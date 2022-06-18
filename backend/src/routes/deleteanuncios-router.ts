import StatusCodes from 'http-status-codes';
import { Router, Request, Response } from 'express';

import { deleteAnuncio }  from '@services/deleteanuncio-service';
import { ParamMissingError } from '@shared/errors';

const router = Router();
const { OK } = StatusCodes;


router.delete('/deleteanuncio/:id',async (req:Request, res:Response) => {
    
    //console.log("REQ: ",req);
    let id = parseInt(req.params.id);
    

    if (!id) {
        throw new ParamMissingError();
    }
    
    

    const deletehorario = await deleteAnuncio (id);
    return res.status(OK).json(deletehorario);
    
});


export default router;