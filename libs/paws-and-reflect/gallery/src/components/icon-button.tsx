import {FC} from 'react';
import {Button, ButtonProps} from '@nextui-org/button';
import {galleryState, usePawsDispatch} from '@paws-and-reflect-next/shared-state';
import {IBreed} from '@paws-and-reflect-next/shared-types';

interface IButtonProps {
  breed: IBreed;
  indexChange: number;
}

const IconButton: FC<ButtonProps & IButtonProps> = ({
  children,
  breed,
  indexChange,
  ...props
}) => {
  const dispatch = usePawsDispatch();

  const handleClick = () => {
    dispatch(
      galleryState.actions.changeGalleryImageIndex({
        breed: breed.name,
        parentBreed: breed.parentBreed,
        indexChange
      })
    );
  };

  return (
    <Button
      isIconOnly
      variant="faded"
      radius="sm"
      className="h-6 min-w-6 w-6 m-1 text-white bg-primary/30 border-none disabled:bg-primary/10 disabled:text-gray-300 hover:bg-primary hover:border-primary hover:outline-transparent"
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}

export default IconButton;
