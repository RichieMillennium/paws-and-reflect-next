'use client';
import {useState, Key} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {Tab, Tabs,} from '@nextui-org/tabs';
import {Autocomplete, AutocompleteItem} from '@nextui-org/autocomplete';
import {IBreed} from '@paws-and-reflect-next/shared-types';

export const AppHeader = () => {
  const [items, setItems] = useState<Array<IBreed>>([]);
  const pathName = usePathname();
  const router = useRouter();

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && !items.length) {
      fetch('/api/search/fetch all')
        .then(res => res.json())
        .then(data => {
          setItems(data.data);
        });
    }
  };

  const handleSelect = (key: Key | null) => {
    router.push(`/gallery/~${key}`);
  };

  return (
    <div className="flex justify-between">
      <Tabs selectedKey={pathName} size="md" color="primary" className="mb-8">
        <Tab key="/gallery" href="/gallery" title="Gallery"/>
        <Tab key="/picture-book" href="/picture-book" title="Picture Book"/>
      </Tabs>
      <Autocomplete
        aria-label="Search Breeds"
        className="w-1/2"
        placeholder="Search Breeds"
        defaultItems={items}
        onOpenChange={handleOpen}
        onSelectionChange={handleSelect}
      >
        {(breed) => (<AutocompleteItem key={`${breed.name},${breed.parentBreed || ''}`}>
          {`${breed.name} ${breed.parentBreed || ''}`}
        </AutocompleteItem>)}
      </Autocomplete>
    </div>
  );
};

export default AppHeader;
