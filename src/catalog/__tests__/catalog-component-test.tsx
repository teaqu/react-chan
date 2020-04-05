import React from 'react';
import { render, cleanup } from 'react-native-testing-library';

import { CatalogComponent } from 'src/catalog/catalog-component';
import actions from 'src/catalog/catalog-actions';

const mockedSelector = jest.fn();
const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: () => mockedSelector,
  useDispatch: () => mockedDispatch
}));

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

describe('catalog component', () => {
  const props: any = createTestProps({
    catalog: {
      isFetching: true,
      threads: []
    }
  });

  const catalogComponent = render(<CatalogComponent {...props} />);

  it('renders correctly', () => {
    expect(catalogComponent.toJSON()).toMatchSnapshot();
    expect(mockedDispatch).toHaveBeenCalledWith(actions.fetchCatalog('a'));
  });

  afterEach(cleanup);
});
