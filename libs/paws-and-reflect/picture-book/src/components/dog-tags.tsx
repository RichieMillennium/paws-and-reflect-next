import { useSelector, useDispatch } from 'react-redux';
import {selectAllBreeds, selectSelectedBreed, breedsState } from '@paws-and-reflect-next/shared-state';
import {IBreed} from '@paws-and-reflect-next/shared-types';
import {Color, breedsAreEqual} from '@paws-and-reflect-next/shared-utils';
import { TagButton } from '../components/tag-button'

export const DogTags = () => {
  const breeds = useSelector(selectAllBreeds);
  const selectedBreed = useSelector(selectSelectedBreed);
  const dispatch = useDispatch();
  const isSelectedBreed = selectedBreed ? breedsAreEqual(selectedBreed) : () => false;

  const handleTagClick = (breed: IBreed) => () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    dispatch(
      breedsState.actions.setSelectedBreed(breed)
    );
  };
  return (
    <div data-test="dog-tags" className="sticky top-0 mb-4 flex flex-wrap justify-center place-content-start h-28 overflow-auto bg-gray-100 border rounded-b-lg border-gray-300">
      {breeds.map(breed => {
        const selected = isSelectedBreed(breed);
        return (
          <TagButton key={`${breed.name}-${breed.parentBreed}`} color={breed.tagColor as Color} selected={selected} onClick={handleTagClick(breed)}>
            {breed.name} {breed.parentBreed}
          </TagButton>
        )
      })}
    </div>
  );
};

export default DogTags;
