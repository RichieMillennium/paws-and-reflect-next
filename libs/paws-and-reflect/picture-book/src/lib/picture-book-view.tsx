'use client'
import DogTags from '../components/dog-tags';
import PictureBook from '../components/picture-book';

export const PictureBookView = () => {
  return (
    <div data-test="picture-book-view">
      <h2 className="text-2xl mb-4">Picture Book</h2>
      <DogTags />
      <PictureBook />
    </div>
  );
};

export default PictureBookView;
