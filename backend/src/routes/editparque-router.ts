import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes'
import { ParamMissingError } from '@shared/errors';
import { editParks } from '@services/editPark-service';

const router = Router();
const { OK } = StatusCodes;

router.put('/editParque/:id', async (req:Request, res:Response) => {

    //let parque = req.body;

    const parque  = req.body ?? {};
    console.log('NEXT: ', req.body);
    console.log('PARQUE: ', parque);
    parque 

    if(!parque.id) {
        throw new ParamMissingError();
    }
    console.log(parque);


    const updateParque = await editParks(parque);
    return res.status(OK).json(updateParque)
    
})

export default router;



