export type ReviewDto = {
  user: number | string;
  text: string;
  rating: number | string;
  uploaded_images: File | null;
};
