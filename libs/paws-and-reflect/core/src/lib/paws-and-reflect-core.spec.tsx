import { render } from '@testing-library/react';

import AppCore from './app-core';

describe('PawsAndReflectCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppCore />);
    expect(baseElement).toBeTruthy();
  });
});
