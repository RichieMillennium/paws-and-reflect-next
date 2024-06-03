import { render } from '@testing-library/react';

import BreedsGallery from './breeds-gallery';

describe('PawsAndReflectGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BreedsGallery />);
    expect(baseElement).toBeTruthy();
  });
});
