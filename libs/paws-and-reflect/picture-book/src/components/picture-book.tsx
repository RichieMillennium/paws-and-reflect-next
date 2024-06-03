import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { VirtuosoGridHandle } from 'react-virtuoso';
import { InfiniteImageGrid, DogPic } from '@paws-and-reflect-next/paws-and-reflect/core';
import { selectSelectedBreedImageUrls, selectSelectedBreed } from '@paws-and-reflect-next/shared-state';

export const PictureBook = () => {
  const selectedBreed = useSelector(selectSelectedBreed);
  const imageUrls = useSelector(selectSelectedBreedImageUrls);
  const scrollerRef = useRef<VirtuosoGridHandle | null>(null);

  useEffect(() => {
    if (selectedBreed && scrollerRef.current) {
      scrollerRef.current.scrollToIndex(0);
    }
  }, [selectedBreed]);

  const handleScrollerRef = useCallback((ref?: VirtuosoGridHandle | null) => {
    if (ref) {
      scrollerRef.current = ref;
    }
  }, []);

  return (
    <div>
      <InfiniteImageGrid
        style={{ height: 'calc(100vh - 375px)'}}
        data={imageUrls || []}
        totalCount={imageUrls?.length || 0}
        itemContent={(_index, src) => <DogPic url={src} />}
        gridRef={handleScrollerRef}
      />
    </div>
  );
};

export default PictureBook;
