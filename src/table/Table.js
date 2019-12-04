import React from 'react';

import './Table.css';
import beer from './beer.png';


const Table = ({ data, sortType, sortField, onSort, onDetailView}) => (
    <table className="table">
        <thead>
            <tr>
                <th id="icon-th" className={sortField === 'name' ? sortType : null} />
                <th onClick={onSort('name')} className={sortField === 'name' ? sortType : null}>Name </th>
                <th onClick={onSort('tagline')} className={sortField === 'tagline' ? sortType : null}>Tagline</th>
                <th onClick={onSort('first_brewed')} className={sortField === 'first_brewed' ? sortType : null}>First brewed</th>
                <th onClick={onSort('abv')} className={sortField === 'abv' ? sortType : null}>ABV</th>
                <th onClick={onSort('ibu')} className={sortField === 'ibu' ? sortType : null}>IBU</th>
            </tr>
        </thead>
        <tbody>
        {data.map(({id, name, tagline, first_brewed, abv, ibu, image_url}) => (
            <tr key={id} onClick={onDetailView(id)}>
                <td className="icon-td">
                    <div className="icon-sm">
                        <img src={image_url ? image_url : beer} alt="beer" className="img-fluid item"/>
                    </div>
                </td>
                <td>{name}</td>
                <td>{tagline}</td>
                <td>{first_brewed}</td>
                <td>{abv}</td>
                <td>{ibu}</td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default Table;
