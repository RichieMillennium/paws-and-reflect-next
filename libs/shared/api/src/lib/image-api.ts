import { IBreed } from '@paws-and-reflect-next/shared-types';
import { fetchSubBreedImages, fetchBreedImages } from './breed-api';

export async function* jitImageLoader(breeds: IBreed[]) {
  for (const breed of breeds) {
    if (breed.imageUrls) {
      yield breed;
    } else if (breed.parentBreed) {
      const images = await fetchSubBreedImages(breed.parentBreed, breed.name);
      breed.imageUrls = images.results;
      breed.galleryImageUrl = breed.imageUrls?.[0];
      yield breed;
    } else {
      const images = await fetchBreedImages(breed.name);
      breed.imageUrls = images.results;
      breed.galleryImageUrl = breed.imageUrls?.[0];
      yield breed;
    }
  }
}
