'use client'
import {FC, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Card, CardFooter} from '@nextui-org/card';
import {Image} from '@nextui-org/image';
import {Button} from '@nextui-org/button';
import {PressEvent} from '@react-types/shared';
import {IBreed} from '@paws-and-reflect-next/shared-types';
import { usePawsSelector, selectGalleryImageIndexes } from '@paws-and-reflect-next/shared-state';
import {createNameParam} from '@paws-and-reflect-next/shared-utils';
import PreviousIcon from './previous-icon';
import NextIcon from './next-icon';
import IconButton from './icon-button';

interface IProps {
  breed: IBreed;
}

export const BreedCard: FC<IProps> = ({breed}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const imageIndexMap = usePawsSelector(selectGalleryImageIndexes);
  const imageIndex = imageIndexMap[`${breed.name}/${breed.parentBreed}`] || 0;
  const imageUrl = breed.imageUrls?.[imageIndex] || breed.galleryImageUrl;

  const handleTriviaClick = (_event: PressEvent) => {
    setLoading(true);
    const nameParam = createNameParam(breed, imageIndex);
    router.push(`/gallery/${nameParam}`);
  };

  return (
    <div className="max-w-[900px] gap-4 grid grid-cols-12 grid-rows-1 px-8 mb-8">
      <Card isFooterBlurred className="col-span-12 sm:col-span-12 h-[300px]">
        <Image
          removeWrapper
          alt={`${breed.name} photo`}
          className="z-0 w-full h-full object-cover"
          src={imageUrl}
        />
        <CardFooter className="absolute left-0 bottom-0 !pt-1 !pb-2 justify-stretch overflow-hidden bg-black/10 shadow-small z-10">
          <h4 className="text-yellow-100 font-medium text-large shadowy-text">
            {`${breed.name} ${breed.parentBreed || ''}`}
          </h4>
          <div className="flex flex-grow justify-end text-white/80 rounded shadowy-text py-2 px-4">
            <Button
              variant="faded"
              radius="sm"
              className="h-6 m-1 text-white bg-primary/30 border-none hover:bg-primary hover:border-primary hover:outline-transparent"
              isLoading={loading}
              onPress={handleTriviaClick}
            >
              AI Trivia
            </Button>
          </div>
          <div className="flex text-white/80 rounded shadowy-text p-2">
            <IconButton breed={breed} indexChange={-1} disabled={imageIndex === 0}>
              <PreviousIcon />
            </IconButton>
            <IconButton breed={breed} indexChange={1} disabled={imageIndex === (breed.imageUrls?.length || 0) - 1}>
              <NextIcon />
            </IconButton>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BreedCard;
