import React from 'react';
import _ from 'lodash';

import Loader from './loader/Loader';
import Header from './header/Header';
import Table from './table/Table';
import DetailModal from './detailModal/DetailModal';

class App extends React.Component {
    state = {
        isLoading: true,
        currentPage: 1,
        totalPages: 13,
        data: [],
        sortType: 'asc', // desc
        sortField: 'name',
        isDetailed: false,
        itemDetailed: null,
        searchInput: ''
    };

    onSort = sortField => () => {
        const dataClone = this.state.data.concat();
        const sortType = this.state.sortType === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(dataClone, sortField, sortType);
        this.setState({ data, sortType, sortField })
    };

    onDetailView = itemId => () => {
        const { data } = this.state;
        this.setState({
            isDetailed: true,
            itemDetailed: data.find((item) => item.id === itemId)
        })
    };

    dismissModal = () => {
        this.setState({
            isDetailed: false
        })
    };

    onRandomClick = () => {
       this.setState({
           isLoading: true
       });
       this.fetchRandom();
    };

    async fetchRandom() {
        const response = await fetch('https://api.punkapi.com/v2/beers/random');
        const data = await response.json();
        this.setState({
            itemDetailed: data[0],
            isLoading: false,
            isDetailed: true
        })
    };

    onSearch = ({target: { value }}) => {
     this.setState({
         searchInput: value
     })  ;
    };

    onSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchSearchData();
    };

    async fetchSearchData() {
    const { searchInput,  sortField, sortType } = this.state;
    const response = await fetch(`https://api.punkapi.com/v2/beers/?beer_name=${searchInput}`);
    const data = await response.json();
    const formatData = data.concat();
    formatData.forEach((item) => item.first_brewed = item.first_brewed.match(/[^/]*$/));
    this.setState({
        data: _.orderBy(formatData, sortField, sortType)
    });
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
        const {
            isLoading,
            data,
            sortType,
            sortField,
            isDetailed,
            itemDetailed,
            searchInput
        } = this.state;

        return (
        <>
            <Header
                onRandomClick={this.onRandomClick}
                onSearch={this.onSearch}
                searchInput={searchInput}
                onSearchSubmit={this.onSearchSubmit} />
            {isDetailed && <DetailModal item={itemDetailed}
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
