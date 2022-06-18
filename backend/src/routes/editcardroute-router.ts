import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes'
import { ParamMissingError } from '@shared/errors';
import { editCarts } from '@services/editcardrouter-service';

const router = Router();
const { OK } = StatusCodes;

router.put('/editcartaruta', async (req:Request, res:Response) => {

    let cartaRuta = req.body;

    if(!cartaRuta.id) {
        throw new ParamMissingError();
    }
    console.log(cartaRuta);


    const updateCarta = await editCarts(cartaRuta);
    return res.status(OK).json()
    
})

export default router;