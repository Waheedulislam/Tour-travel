import { TTour } from './tour.interface';
import Tour from './tour.model';

const createTours = async (payload: TTour) => {
  const result = await Tour.create(payload);
  return result;
};

const getTours = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const excludingImportant = ['searchTerm', 'page', 'limit'];

  excludingImportant.forEach((key) => delete queryObj[key]);

  const searchTerm = query?.searchTerm || '';

  const searchableFields = ['name', 'startLocation', 'location'];

  // const result = await Tour.find({
  //   $or: [
  //     { name: { $regex: searchTerm, $options: 'i' } },
  //     { startLocation: { $regex: searchTerm, $options: 'i' } },
  //     { location: { $regex: searchTerm, $options: 'i' } },
  //   ],
  // });

  const searchQuery = Tour.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filter Query
  const filterQuery = searchQuery.find(queryObj);

  // paginate

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) * 10;

  // skip =(page-1)*limit
  const skip = (page - 1) * limit;

  const result = await filterQuery.skip(skip).limit(limit);

  return result;
};

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id);
  return result;
};
const updateTour = async (id: string, payload: Partial<TTour>) => {
  const result = Tour.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteTour = async (id: string, payload: Partial<TTour>) => {
  const result = Tour.findByIdAndDelete(id);
  return result;
};

export const tourServices = {
  createTours,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
