import { Router } from 'express';
import authRouter from './auth-router';
import userRouter from './user-router';
import weatherRouter from './weather-router';
import parquesRouter from './parques-router';
import contactoRouter from './contacto-router';
import addparquesRouter from './addparques-router';
import deleteparquesRouter from './deleteparques-router';
import editparquesRouter from './editparque-router';
import addcartasrutasRouter from './addcardroutes-router';
import deletecartasrutasRouter from './deletecardroutes-router';
import editcartasrutasRouter from './editcardroute-router';
import addhorarioRouter from './addhorario-router';
import deletehorarioRouter from './deletehorario-router';
import addfloraRouter from './addflora-router';
import addfaunaRouter from './addfauna-router';
import addanuncioRouter from './addanuncio-router';
import deleteAnuncioRouter from './deleteanuncios-router';
import editFloraRouter from './editflora-router';

import editfaunaRouter from './editfauna-router';

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/weather', weatherRouter);
apiRouter.use('/parques', parquesRouter);
apiRouter.use('/encargado', contactoRouter);
apiRouter.use('/', addparquesRouter);
apiRouter.use('/', deleteparquesRouter);
apiRouter.use('/', editparquesRouter);
apiRouter.use('/', addcartasrutasRouter);
apiRouter.use('/', deletecartasrutasRouter);
apiRouter.use('/', editcartasrutasRouter);
apiRouter.use('/', addhorarioRouter);
apiRouter.use('/', deletehorarioRouter);
apiRouter.use('/', addfloraRouter);
apiRouter.use('/', addfaunaRouter);
apiRouter.use('/', addanuncioRouter);
apiRouter.use('/', deleteAnuncioRouter);
apiRouter.use('/', editFloraRouter);
apiRouter.use('/', editfaunaRouter);


// Export default
export default apiRouter;
