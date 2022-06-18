import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes'
import { ParamMissingError } from '@shared/errors';
import { editHorarios } from '@services/editHorario-service';

const router = Router();
const { OK } = StatusCodes;

router.put('/editHorario/:id', async (req:Request, res:Response) => {

    //let parque = req.body;

    const horario  = req.body ?? {};
    console.log('NEXT: ', req.body);
    console.log('HORARIO: ', horario);
    horario 

    if(!horario.id) {
        throw new ParamMissingError();
    }
    console.log(horario);


    const updateHorario = await editHorarios(horario);
    return res.status(OK).json(updateHorario)
    
})

export default router;
