import { Request, Response } from 'express';
import { tourServices } from './tour.service';

const createTours = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await tourServices.createTours(payload);

    res.send({
      success: true,
      message: 'Tour created successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const getTours = async (req: Request, res: Response) => {
  try {
    const result = await tourServices.getTours(req.query);

    res.send({
      success: true,
      message: 'Tour get successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const getSingleTours = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await tourServices.getSingleTour(id);

    res.send({
      success: true,
      message: 'Single Tour get successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const updateTours = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const result = await tourServices.updateTour(id, body);

    res.send({
      success: true,
      message: 'Tour update successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};
const deleteTours = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const result = await tourServices.deleteTour(id, body);

    res.send({
      success: true,
      message: 'Tour delete successfully',
      result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const tourController = {
  getSingleTours,
  getTours,
  createTours,
  updateTours,
  deleteTours,
};
