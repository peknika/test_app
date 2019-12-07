import React from 'react';

import beer from './beer.png';
import './Header.css';

const Header = ({ onRandomClick, onSearch, searchInput, onSearchSubmit}) => (
    <nav className="navbar navbar-expand-sm">
        <button className="navbar-toggler custom-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#beerMenu"
                aria-controls="beerMenu"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="beerMenu">
            <form className="form-inline mr-auto mt-1 mt-lg-0">
                <button className="btn btn-warning" type="button" onClick={onRandomClick}>
                    <img src={beer} alt="beer" className="img-fluid beer-icon" />
                    Random
                </button>
            </form>
            <form className="form-inline my-2 my-lg-0" onSubmit={onSearchSubmit}>
                <input className="form-control mr-sm-2"
                       type="search"
                       placeholder="Search"
                       value={searchInput}
                       aria-label="Search"
                       onChange={onSearch} />
                    <button className="btn btn-warning my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
);

export default Header;
