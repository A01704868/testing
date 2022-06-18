import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { getEncargado, createEncargado, deleteEncargado, updateEncargado } from '@services/contact-service';
import { ParamMissingError } from '@shared/errors';

// Constants
const router = Router();
const { OK, NOT_FOUND } = StatusCodes;

// Paths
export const p = {
    get: '/read/:id',
    add: '/create',
    update: '/update',
    delete: '/delete/:id',
} as const;

router.get(p.get, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (id === null || id === undefined) {
        throw new ParamMissingError();
    }

    const encargado = await getEncargado(id);

    if (!encargado) {
        res.status(NOT_FOUND).send({ error: "No hay un encargado asignado al parque con id: " + id });
        return;
    }
    res.status(OK).json(encargado);
});


router.post(p.add, async (req: Request, res: Response) => {
    const { encargado } = req.body ?? {};
    const newEncargado = await createEncargado(encargado);
    res.status(OK).json(newEncargado);
});


router.put(p.update, async (req: Request, res: Response) => {

    const { encargado } = req.body ?? {};
    console.log(encargado)
    if (!encargado) {
        throw new ParamMissingError();
    }

    const editEncargado = await updateEncargado(encargado);
    if (!editEncargado) {
        return res.status(NOT_FOUND).json({ error: `No hay un encargado con id: ${encargado.id}` })
    }

    return res.status(OK).json(editEncargado);
});


router.delete(p.delete, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    if (id === null || id === undefined) {
        throw new ParamMissingError();
    }

    const borrarEncargado = await deleteEncargado(id);
    res.status(OK).json(borrarEncargado);
});





// Export default
export default router;