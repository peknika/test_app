import React from 'react';
import _ from 'lodash';

import Loader from './loader/Loader';
import Header from './header/Header';
import Table from './table/Table';
import DetailModal from './detailModal/DetailModal';
import Pagination from './pagination/Pagination';

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

    handle = (promise) => {
        return promise
            .then(data => ([data, undefined]))
            .catch(error => Promise.resolve([undefined, error]));
    };

    fetchData = async ( search = false ) => {
        const { searchInput,  sortField, sortType, currentPage } = this.state;
        let url = 'https://api.punkapi.com/v2/beers';
        url = search && searchInput.length > 0 ? `${url}?beer_name=${searchInput}` : `${url}/?page=${currentPage}`;
        const [ response, error ] = await this.handle(fetch(url));
        if (error) {
            console.log(error)
        }
        const data = await response.json();
        const formatData = data.concat();
        formatData.forEach((item) => item.first_brewed = item.first_brewed.match(/[^/]*$/));
        this.setState({
            data: _.orderBy(formatData, sortField, sortType)
        });
    };

    async componentDidMount() {
        this.fetchData();
        this.setState({
            isLoading: false
        })
  }

    onSearchSubmit = (e) => {
        e.preventDefault();
        this.fetchData( true );
    };

    onPageChange = (newPage) => () => {
        this.setState(
            { currentPage: newPage },
            () => this.fetchData()
        );
    };

  render() {
        const {
            isLoading,
            data,
            sortType,
            sortField,
            isDetailed,
            itemDetailed,
            searchInput,
            currentPage,
            totalPages
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
            <Pagination
                currentPage={currentPage}
                onPageChange={this.onPageChange}
                totalPages={totalPages}
            />
            </>
        );
  }
}

export default App;
