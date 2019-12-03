import React from 'react';
import _ from 'lodash';

import Loader from './loader/Loader';
import Table from './table/Table';
import DetailedItemView from './detailItemView/DetailItemView';

class App extends React.Component {
    state = {
        isLoading: true,
        data: [],
        sortType: 'asc', // desc
        sortField: 'name',
        isDetailed: false,
        itemDetailed: null
    };

    onSort = sortField => () => {
        const { data, sortType } = this.state;
        const dataClone = data.concat();
        const newSortType = sortType === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(dataClone, sortField, newSortType);
        this.setState({
            data: orderedData,
            sortType: newSortType,
            sortField
        })
    };

    onDetailView = itemId => () => {
        this.setState({
            isDetailed: true,
            itemDetailed: itemId
        })
    };

    dismissModal = () => {
        this.setState({
            isDetailed: false
        })
    };

    async componentDidMount() {
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const data = await  response.json();
    const formatData = data.concat();
    formatData.forEach((item) => item.first_brewed = item.first_brewed.match(/[^/]*$/));
    const { sortType, sortField } = this.state;

    this.setState({
        isLoading: false,
        data: _.orderBy(formatData, sortField, sortType)
    })
  }

  render() {
        const { isLoading , data, sortType, sortField, isDetailed, itemDetailed} =this.state;
        return (
        <>
            {isDetailed && <DetailedItemView item={data.find((item) => item.id === itemDetailed)}
                                             isDetailed={isDetailed}
                                             dismissModal={this.dismissModal}
                            />}
                <div className="container">
                    {
                        isLoading
                        ? <Loader />
                        : <Table
                                data={data}
                                sortType={sortType}
                                sortField={sortField}
                                onSort={this.onSort}
                                onDetailView={this.onDetailView}
                            />
                    }
                </div>
            </>
        );
  }
}

export default App;
