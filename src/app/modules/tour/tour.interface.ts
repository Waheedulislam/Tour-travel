export type TTour = {
  name: string;
  durationHours: number;
  averageRating: number; // Default value is 5, so it's optional
  price: number;
  coverImage: string;
  image: string[]; // Optional array of strings
  startDate: Date;
  startLocation: string;
  location: string[]; // Optional array of locations
  slag: string;
  availableSets: number;
};
