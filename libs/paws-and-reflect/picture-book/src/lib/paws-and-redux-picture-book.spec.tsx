import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@paws-and-redux/shared-state';
import { PictureBookView } from './paws-and-redux-picture-book';

describe('PawsAndReduxPictureBook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Provider store={store}>
      <PictureBookView />
    </Provider>);
    expect(baseElement).toBeTruthy();
  });
});
