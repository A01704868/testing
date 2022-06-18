import StatusCodes from 'http-status-codes';
import { Router } from 'express';
import { getParks } from '@services/park-service';
import { access } from 'fs/promises';
import { getActivities } from '@services/activity-service';
import { getEncargado, createEncargado, deleteEncargado } from '@services/contact-service';
import { PrismaClient } from '@prisma/client'
import { ParamMissingError } from '@shared/errors';
import path from "path";

// Constants
const router = Router();
const { OK, NOT_FOUND } = StatusCodes;
const prisma = new PrismaClient();

const routesDir = __dirname.indexOf("routes");
const assetsDir = __dirname.slice(0, routesDir) + "assets";

router.get('/', async (req, res) => {
    const parks = await getParks();
    res.status(OK).json(parks);
});

// /api/parques/img/1 : ejemplo
router.get('/img/:id', async (req, res) => {
    let id = parseInt(req.params.id);

    try {
        const parks = await getParks();
        const park = parks.find(park => park.id === id);
        if (park) {
            const imgPath = path.join(assetsDir, park.imagen);

            // Checa si la imagen existe y tenemos acceso de escritura
            await access(imgPath);
            res.sendFile(imgPath);
        } else {
            res.status(NOT_FOUND).json(
            {
                error: "Image not found",
                parkId: id
            });
        }
    } catch (err) {
        res.status(NOT_FOUND).json(
        {
            error: "Image doesn't exist",
            parkId: id
        });
    }
});

async function getPark(id){
    const click = await prisma.parque.update({
        where: {
            id: id,
        },
        data: {
            clicks: {
                increment: 1,
            },
        }
    });
    const park = await prisma.parque.findUnique({
        where: {
            id: id,
          },
        include: {
            anuncios: true,
            horario: true,
            flora: true,
            fauna:true,
            actividades: true
        }
    });
    return park;
}

async function postAnuncio(titulo, descripcion, variante, parqueId){
    const anuncio = await prisma.anuncio.create({
        data: {
            titulo: titulo,
            descripcion: descripcion,
            variante: variante,
            parqueId: parqueId,
        },
    });

    return anuncio;
}

export async function getPactivities(id){
    const pActivities = await prisma.actividad.findMany({
        where: {
            parques: {
              some: {
                parqueId: id,
              },
            },
          },
    });

    return pActivities;
}

export async function getParkActivityImg(id){
    const forImage = await prisma.actividadParque.findMany({
        where: {
            parqueId: id
          },
    });

    return forImage;
}

export async function getParkFauna(id){
    const parkFauna = await prisma.fauna.findMany({
        where: {
            parques: {
                some: {
                    parqueId: id,
                },
            },
        },
    });
    
    return parkFauna;
}

export async function getParkFlora(id){
    const parkFlora = await prisma.flora.findMany({
        where: {
            parques:{
                some: {
                    parqueId: id,
                },
            },
        },
    });

    return parkFlora;
}

export async function getFlora(id){
    const flora = await prisma.flora.findUnique({
        where: {
            id: id,
        }
    });

    return flora;
}

export async function getFauna(id){
    const fauna = await prisma.fauna.findUnique({
        where: {
            id: id,
        }
    });

    return fauna;
}

//route for retrieving single park by id
router.get('/parque/:id', async (req, res) => {
    const park = await getPark(parseInt(req.params.id));
    res.status(OK).json(park);
});

//route for activity filter button
router.get('/activity', async (req, res) => {
    const activities = await getActivities();
    res.status(OK).json(activities);
});

router.post('/anuncio', async (req,res) => {
    const {titulo, descripcion, variante, parqueId} = req.body ?? {};
    const result = await postAnuncio(titulo, descripcion, variante, parseInt(parqueId));
    res.status(OK).json(result);
});


router.get('/pActivities/:id', async (req, res) => {
    const activities = await getPactivities(parseInt(req.params.id));
    res.status(OK).json(activities);
});

router.get('/activityImg/:id', async (req, res) => {
    const activityImg = await getParkActivityImg(parseInt(req.params.id));
    res.status(OK).json(activityImg);
});

router.get('/parkFauna/:id', async (req, res) => {
    const parkFauna = await getParkFauna(parseInt(req.params.id));
    res.status(OK).json(parkFauna);
});

router.get('/parkFlora/:id', async (req, res) => {
    const parkFlora = await getParkFlora(parseInt(req.params.id));
    res.status(OK).json(parkFlora);
});

router.get('/flora/:id', async (req, res) => {
    const flora = await getFlora(parseInt(req.params.id));
    res.status(OK).json(flora);
});

router.get('/fauna/:id', async (req, res) => {
    const fauna = await getFauna(parseInt(req.params.id));  
    res.status(OK).json(fauna);
});

/*router.get('/horario', async (req, res) => {
    const horarios = await getHorario();
    res.status(OK).json(horarios);
});
*/

/*
router.get('/activityParque', async (req, res) => {
    const activityPark = await getActivityParque();
    res.status(OK).json(activityPark);
});
*/





// Export default
export default router;