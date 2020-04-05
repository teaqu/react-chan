import React from 'react';
import { render, cleanup } from 'react-native-testing-library';
import { useSelector } from 'react-redux';

import catalogResponse from 'src/shared/__tests__/__mocks__/catalog-response.json';
import { CatalogComponent } from 'src/catalog/catalog-component';
import actions from 'src/catalog/catalog-actions';

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockedDispatch
}));
const mockedSelector = useSelector as jest.Mock;
describe('catalog component', () => {
  const mockAppState = {
    catalog: {
      threads: catalogResponse[0].threads,
      isFetching: false
    }
  };

  mockedSelector.mockImplementation(callback => callback(mockAppState));

  const catalogComponent = render(<CatalogComponent />);

  it('renders correctly', () => {
    expect(catalogComponent.toJSON()).toMatchSnapshot();
    expect(mockedDispatch).toHaveBeenCalledWith(actions.fetchCatalog('a'));
    expect(mockedSelector).toHaveBeenCalled();
  });

  afterEach(cleanup);
});
