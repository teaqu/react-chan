import React from 'react';
import { render, cleanup } from 'react-native-testing-library';

import { CatalogComponent } from '../catalog-component';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});
describe('catalog component', () => {
  let props: any = createTestProps({
    catalog: {
      isFetching: true,
      threads: []
    },
    fetchCatalog: jest.fn()
  });
  const catalogComponent = render(<CatalogComponent {...props} />);

  it('renders correctly', () => {
    expect(catalogComponent.toJSON()).toMatchSnapshot();
    expect(props.fetchCatalog).toHaveBeenCalled();
  });

  afterEach(cleanup);
});
