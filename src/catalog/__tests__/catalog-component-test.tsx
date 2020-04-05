import React from 'react';
import { render, cleanup } from 'react-native-testing-library';
import { useSelector } from 'react-redux';

import { CatalogComponent } from 'src/catalog/catalog-component';
import actions from 'src/catalog/catalog-actions';

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockedDispatch
}));
jest.mock('src/catalog/catalog-thread-component', () => {
  'CatalogThreadComponent';
});
const mockedSelector = useSelector as jest.Mock;
describe('catalog component', () => {
  const mockAppState = {
    catalog: {
      threads: [],
      isFetching: false
    }
  };

  mockedSelector.mockImplementation(callback => callback(mockAppState));

  render(<CatalogComponent />);

  it('renders correctly', () => {
    expect(mockedDispatch).toHaveBeenCalledWith(actions.fetchCatalog('a'));
    expect(mockedSelector).toHaveBeenCalled();
  });

  afterEach(cleanup);
});
