import React, { Dispatch, Component, ReactNode } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { Action } from 'redux';

import { RootStackParamList } from 'src/shared/navigator';
import { RootState } from 'src/shared/root-reducer';

import { Thread } from '../thread/thread';

import { CatalogState } from './catalog-reducers';
import { CatalogThreadComponent } from './catalog-thread-component';
import actions from './catalog-actions';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Catalog'>;
  catalog: CatalogState;
  fetchCatalog: (boardId: string) => void;
};

export class CatalogComponent extends Component<Props, RootState> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCatalog('a');
  }

  onRefresh = () => {
    this.props.fetchCatalog('a');
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchCatalog: (boardId: string) => {
    dispatch(actions.fetchCatalog(boardId));
  }
});

const mapStateToProps = (state: RootState) => ({
  catalog: state.catalog
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogComponent);
