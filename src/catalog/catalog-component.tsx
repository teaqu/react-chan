import React, { Component, ReactNode } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { Thread } from 'src/catalog/thread';
import { CatalogThreadComponent } from './catalog-thread-component';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/shared/navigator';
import { fetchCatalogIfNeeded } from './catalog-actions';
import { RootState } from 'src/shared/root-reducer';
import { connect } from 'react-redux';
import { CatalogState } from './catalog-reducers';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Catalog'>;
  catalog: CatalogState;
  fetchCatalogIfNeeded: (board: string) => void;
};

/**
 * Render the catalog
 */
class CatalogComponent extends Component<Props, RootState> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCatalogIfNeeded('a');
  }

  onRefresh = () => {
    this.props.fetchCatalogIfNeeded('a');
  };

  render(): ReactNode {
    const { catalog } = this.props;
    return (
      <FlatList<Thread>
        refreshControl={
          <RefreshControl
            refreshing={catalog.isFetching}
            onRefresh={this.onRefresh}
          />
        }
        style={styles.catalog}
        data={catalog.threads}
        numColumns={3}
        keyExtractor={item => item.no.toString()}
        renderItem={({ item }) => (
          <CatalogThreadComponent
            navigation={this.props.navigation}
            thread={item}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  catalog: {
    backgroundColor: '#eef2ff'
  }
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, Action<string>>
) => {
  return {
    fetchCatalogIfNeeded: (board: string) => {
      dispatch(fetchCatalogIfNeeded(board));
    }
  };
};

const mapStateToProps = (state: RootState) => ({
  catalog: state.catalog
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogComponent);
