import { Router } from 'express';
import { tourController } from './tour.controller';
import { upload } from '../../../helpers/fileUploadHelper';
import { TourValidation } from './tour.validation';
import validateRequest from '../../../middleWares/validationRequest';

const tourRouter = Router();

tourRouter.post(
  '/create-tour',
  upload.single('file'),
  tourController.createTours,
);
tourRouter.get('/:id', tourController.getSingleTours);
tourRouter.get('/', tourController.getTours);
tourRouter.patch('/:id', tourController.updateTours);
tourRouter.delete('/:id', tourController.deleteTours);

export default tourRouter;
