import { Router } from 'express';
import { tourController } from './tour.controller';

const tourRouter = Router();

tourRouter.post('/create-tour', tourController.createTours);
tourRouter.get('/:id', tourController.getSingleTours);
tourRouter.get('/', tourController.getTours);
tourRouter.patch('/:id', tourController.updateTours);
tourRouter.delete('/:id', tourController.deleteTours);

export default tourRouter;
