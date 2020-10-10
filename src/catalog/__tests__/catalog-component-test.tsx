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
jest.mock('react-navigation-collapsible', () => ({
  useCollapsibleStack: () => ({
    onScroll: jest.fn(),
    containerPaddingTop: 10,
    scrollIndicatorInsetTop: 10
  })
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
    },
    boardPicker: {
      boardId: 'a'
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
