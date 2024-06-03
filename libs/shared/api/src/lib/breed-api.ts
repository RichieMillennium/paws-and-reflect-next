import {IBreed} from '@paws-and-reflect-next/shared-types';
import {pickColor, sortBreeds, updateBreedsCache} from '@paws-and-reflect-next/shared-utils';
import {apiGet} from './base-api';

const ALL_DOGS_URL = 'https://dog.ceo/api/breeds/list/all';
const SUCCESS_STATUS = 'success';

interface IBreedsResponse {
  status?: string;
  message?: Record<string, string[]>;
}

interface IBreedImagesResponse {
  status?: string;
  message?: string[];
}

const isBreedsResponse = (res: IBreedsResponse | Error): res is IBreedsResponse => {
  return !!res;
};

const isBreedImagesResponse = (res: IBreedImagesResponse | Error): res is IBreedImagesResponse => {
  return !!res;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

const getBreedImagesUrl = (breed: string) =>
  `https://dog.ceo/api/breed/${breed}/images`;

const getSubBreedImagesUrl = (breed: string, subBreed: string) =>
  `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;

let breedsCache: IBreed[] = [];
const setBreedsCache = (newValue: IBreed[]) => {
  breedsCache = newValue;
}

// const createBreed = ([breed, subBreeds]: [string, string[]]) => {
//   return {
//     name: breed,
//     subBreeds,
//     tagColor: pickColor(),
//   };
// }

const createBreedWithImages = async ([breed, subBreeds]: [string, string[]]) => {
  const images = await fetchBreedImages(breed);
  const imageUrls = images.results || [];
  return {
    name: breed,
    subBreeds,
    tagColor: pickColor(),
    imageUrls,
    galleryImageUrl: imageUrls.length ? imageUrls[0] : undefined
  };
}

const createSubBreed = (breed: IBreed) => (subBreed: string) => {
  return {
    name: subBreed,
    parentBreed: breed.name,
    subBreeds: [],
    tagColor: pickColor()
  }

};

const createSubBreedWithImages = async (breed: IBreed) => async (subBreed: string) => {
  const imageUrls = await fetchSubBreedImages(breed.name, subBreed)
  return {
    name: subBreed,
    parentBreed: breed.name,
    subBreeds: [],
    imageUrls: imageUrls.results || [],
    galleryImageUrl: imageUrls.results?.length ? imageUrls.results[0] : undefined,
    tagColor: pickColor()
  }

};

// const addAllSubBreeds = (breeds: IBreed[]) => {
//   return breeds.reduce((accum: Array<IBreed>, breed) => {
//     if (breed.subBreeds) {
//       const newBreeds: IBreed[] = breed.subBreeds.map(createSubBreed(breed));
//       return accum.concat(newBreeds);
//     }
//     return accum;
//   }, breeds);
// };

const addAllSubBreedsWithImages = async (breeds: IBreed[]) => {
  return await breeds.reduce(async (accum: Promise<Array<IBreed>>, breed) => {
    if (breed.subBreeds) {
      const newBreeds: IBreed[] = await Promise.all(breed.subBreeds.map(await createSubBreedWithImages(breed)));
      return (await accum).concat(newBreeds);
    }
    return await accum;
  }, Promise.resolve(breeds));
};

export const fetchAllBreeds = async () => {
  if (breedsCache.length) {
    return { results: breedsCache };
  }
  try {
    const data = await apiGet<IBreedsResponse>(ALL_DOGS_URL);
    if (isBreedsResponse(data) && data.status === SUCCESS_STATUS) {
      const breeds = await Promise.all(Object.entries(data.message || {})
        .map<Promise<IBreed>>(async ([breed, subBreeds]) => {
          // creating breeds without images and deferring to client side only saved ~0.5sec on initial load
          // return createBreed([breed, subBreeds]);
          return await createBreedWithImages([breed, subBreeds]);
        }));
      // const allBreeds = addAllSubBreeds(breeds);
      const allBreeds = await addAllSubBreedsWithImages(breeds);
      const results = sortBreeds(allBreeds);
      updateBreedsCache(breedsCache, results, setBreedsCache);
      return {
        results
      };
    } else {
      return {
        error: 'There was a problem trying to find the dogs.'
      };
    }
  } catch (e) {
    return {
      error: getErrorMessage(e)
    };
  }
};

export const fetchBreedImages = async (breed: string) => {
  try {
    const url = getBreedImagesUrl(breed);
    const data = await apiGet<IBreedImagesResponse>(url);
    if (isBreedImagesResponse(data) && data.status === SUCCESS_STATUS) {
      return {
        results: data.message || []
      };
    } else {
      return {
        error: 'There was a problem trying to find the dog images'
      }
    }
  } catch (e) {
    return {
      error: getErrorMessage(e)
    }
  }
};

export const fetchSubBreedImages = async (breed: string, subBreed: string) => {
  try {
    const url = getSubBreedImagesUrl(breed, subBreed);
    const data = await apiGet<IBreedImagesResponse>(url);
    if (isBreedImagesResponse(data) && data.status === SUCCESS_STATUS) {
      return {
        results: data.message || []
      };
    } else {
      return {
        error: 'There was a problem trying to find the dog images'
      }
    }
  } catch (e) {
    return {
      error: getErrorMessage(e)
    }
  }
};

export const getImages = async (name: string, parentBreed?: string): Promise<Array<string>> => {
  const data = (parentBreed)
    ? await fetchSubBreedImages(parentBreed, name)
    : await fetchBreedImages(name);
  updateBreedsCache(breedsCache, [{
    name,
    parentBreed,
    tagColor: pickColor(),
    imageUrls: data.results || []
  }], setBreedsCache);
  return data.results || [];
};
