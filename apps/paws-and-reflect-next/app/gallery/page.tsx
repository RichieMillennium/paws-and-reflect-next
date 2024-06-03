import { fetchAllBreeds } from '@paws-and-reflect-next/shared-api';
import { BreedsGallery } from '@paws-and-reflect-next/paws-and-reflect-gallery';
import { StoreProvider } from '@paws-and-reflect-next/paws-and-reflect/core';

const GalleryPage = async () => {
  const breeds = await fetchAllBreeds();
  return (
    <StoreProvider breeds={breeds.results} error={breeds.error}>
      <BreedsGallery />
    </StoreProvider>
  );
};

export default GalleryPage;
