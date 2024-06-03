'use client';
import { usePathname } from 'next/navigation';
import { Tab, Tabs, } from '@nextui-org/tabs';

export const AppHeader = () => {
  const pathName = usePathname();
  return (
    <Tabs selectedKey={pathName} size="md" color="primary" className="mb-8">
      <Tab key="/gallery" href="/gallery" title="Gallery" />
      <Tab key="/picture-book" href="/picture-book" title="Picture Book" />
    </Tabs>
  );
};

export default AppHeader;
