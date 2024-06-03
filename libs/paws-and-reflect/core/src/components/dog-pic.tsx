'use client'

import {FC} from 'react';
import {Card} from '@nextui-org/card';
import {Image} from '@nextui-org/image';

interface IProps {
  url?: string;
}

export const DogPic: FC<IProps> = ({url}) => {
  return (
    <Card className="w-full h-[300px] min-h-[300px] mb-8">
      <Image removeWrapper className="z-0 h-full w-full object-cover"
             src={url} alt="Dog Pic"/>
    </Card>
  );
};
