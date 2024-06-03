import { fetchAllBreeds } from '@paws-and-reflect-next/shared-api';
import { PictureBookView } from '@paws-and-reflect-next/paws-and-reflect-picture-book';
import { StoreProvider } from '@paws-and-reflect-next/paws-and-reflect/core';

const PictureBookPage = async () => {
  const breeds = await fetchAllBreeds();
  return (
    <StoreProvider breeds={breeds.results} error={breeds.error}>
      <PictureBookView />
    </StoreProvider>
  );
};

export default PictureBookPage;
