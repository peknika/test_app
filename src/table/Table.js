import React from 'react';
import './Table.css';

const Table = ({ data, sortType, sortField, onSort, onDetailView}) => (
    <table className="table">
        <thead>
            <tr>
                <th onClick={onSort('name')} className={sortField === 'name' ? sortType : null}>Name </th>
                <th onClick={onSort('tagline')} className={sortField === 'tagline' ? sortType : null}>Tagline</th>
                <th onClick={onSort('first_brewed')} className={sortField === 'first_brewed' ? sortType : null}>First brewed</th>
                <th onClick={onSort('abv')} className={sortField === 'abv' ? sortType : null}>ABV</th>
                <th onClick={onSort('ibu')} className={sortField === 'ibu' ? sortType : null}>IBU</th>
            </tr>
        </thead>
        <tbody>
        {data.map(({id, name, tagline, first_brewed, abv, ibu}) => (
            <tr key={id} onClick={onDetailView(id)}>
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
